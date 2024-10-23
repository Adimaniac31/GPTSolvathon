import { analyzeContent, saveArticle, analyzeTag, suggestNewContent } from '../services/openai.service.js'; // Import the service functions
import sequelize from "../sequelize.js";

export const analyzeArticle = async (req, res) => {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    try {
        // Call the service function to analyze the article
        const analysis = await analyzeContent(content);
        
        // Analyze and get the tag for the analysis
        const tag = await analyzeTag(analysis);
        const jsonTags = JSON.stringify(tag);
        // Suggest new content based on the analysis
        const suggestedArticle = await suggestNewContent(analysis, content);

        // Save the article, analysis, tag, and suggested article using a raw SQL query
        const result = await saveArticle(title, content, analysis, suggestedArticle, jsonTags);

        // Respond with the newly created article ID
        res.status(201).json({
            id: result.insertId, // Return the ID of the inserted article
            title,
            analysis,
            tag,
            suggestedArticle,
        });
    } catch (error) {
        console.error('Error analyzing article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to save an article to the database using raw SQL
export const saveArticleData = async (req, res) => {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    const sql = `INSERT INTO articles (title, content, createdAt, updatedAt) 
                 VALUES (?, ?, NOW(), NOW())`;

    try {
        // Execute the raw SQL query
        await sequelize.query(sql, {
            replacements: [title, content],
        });

        // Respond with a success message
        res.status(201).json({ message: 'Article saved successfully.' });
    } catch (error) {
        console.error('Error saving article to MySQL:', error);
        res.status(500).json({ message: 'Error saving article', error });
    }
};

export const analyzeAll = async (req, res) => {
    const sqlSelect = `
        SELECT * FROM articles 
        WHERE analysis IS NULL 
        OR tags IS NULL 
        OR suggestedArticle IS NULL
    `;

    try {
        // Fetch articles with analysis, tags, or suggestedArticle as null
        const [articles] = await sequelize.query(sqlSelect);
        
        if (articles.length === 0) {
            return res.status(404).json({ message: 'No articles to analyze.' });
        }

        for (const article of articles) {
            try {
                // Analyze the content using OpenAI
                const analysisResult = await analyzeContent(article.content);

                // Analyze and get the tag for the analysis
                const tag = await analyzeTag(analysisResult);
                const jsonTags = JSON.stringify(tag);

                // Suggest new content based on the analysis
                const suggestedArticle = await suggestNewContent(analysisResult, article.content);

                // Update the article with the analysis result, tag, and suggested content
                const sqlUpdate = `UPDATE articles SET analysis = ?, tags = ?, suggestedArticle = ?, updatedAt = NOW() WHERE id = ?`;
                await sequelize.query(sqlUpdate, {
                    replacements: [analysisResult, jsonTags, suggestedArticle, article.id],
                });
            } catch (error) {
                console.error(`Error analyzing article with ID ${article.id}:`, error);
                // Optionally, you can log the error or handle it differently per article
            }
        }

        res.status(200).json({ message: 'All articles analyzed successfully.' });
    } catch (error) {
        console.error('Error analyzing articles:', error);
        res.status(500).json({ message: 'Error analyzing articles', error });
    }
};

export const fetchAllArticles = async (req, res) => {
    const sqlQuery = `
        SELECT title, content, analysis, tags, suggestedArticle 
        FROM articles
    `;

    try {
        const [articles] = await sequelize.query(sqlQuery);
        
        if (articles.length === 0) {
            return res.status(404).json({ message: 'No articles found.' });
        }

        res.status(200).json(articles); // Send the fetched articles as response
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Error fetching articles', error });
    }
};


