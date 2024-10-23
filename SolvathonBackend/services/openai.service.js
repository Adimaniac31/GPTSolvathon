import OpenAI from 'openai'; // Ensure to install the OpenAI library and configure it
import dotenv from 'dotenv';
import sequelize from '../sequelize.js'; // Import Sequelize instance

dotenv.config();

// Initialize OpenAI API with your GPT-4o model key
const openai = new OpenAI({
    apiKey: process.env.GPT_4O_API_KEY,
});

export const analyzeContent = async (content) => {
    // Structure the messages as required by the API
    const messages = [
        {
            role: 'user',
            content: `Analyze the following article for outdated information, broken links, obsolete industry terms, and suggest corrections: ${content}`
        },
    ];

    try {
        // Ensure you're using the correct method to create a chat completion
        const gptResponse = await openai.chat.completions.create({
            model: 'gpt-4', // Make sure you're using the correct model name
            messages: messages,
            max_tokens: 1000,
            temperature: 0.5,
        });

        // Return the analysis text from the response
        return gptResponse.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error interacting with OpenAI:', error);
        throw new Error('Failed to analyze content');
    }
};

// Function to analyze and generate a tag based on the content analysis
export const analyzeTag = async (analysis) => {
    // Structure the messages for tag generation
    const messages = [
        {
            role: 'user',
            content: `Based on the following analysis, give me a one-word tag that suits the most among these options: 'no problem', 'obsolete industry terms', 'outdated data', 'broken links', 'misleading data', 'other': ${analysis}`
        },
    ];

    try {
        const gptResponse = await openai.chat.completions.create({
            model: 'gpt-4', // Ensure you're using the correct model name
            messages: messages,
            max_tokens: 10, // Keep the response short since we need a single word
            temperature: 0.5,
        });

        // Return the one-word tag from the response
        return gptResponse.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error interacting with OpenAI for tag analysis:', error);
        throw new Error('Failed to analyze tag');
    }
};

export const saveArticle = async (title, content, analysis, suggestedArticle, tag) => {
    const query = `
        INSERT INTO articles (title, content, analysis, suggestedArticle, tags)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    try {
        const [result] = await sequelize.query(query, {
            replacements: [title, content, analysis, suggestedArticle, tag],
        });
        return result; // Return the result of the insert operation
    } catch (error) {
        console.error('Error saving article to MySQL:', error);
        throw new Error('Failed to save article');
    }
};

// Example function to suggest new content based on analysis
export const suggestNewContent = async (analysis,content) => {
    const messages = [
        {
            role: 'user',
            content: `Based on the following analysis, suggest new content: ${analysis} where the old content is ${content}`
        },
    ];

    try {
        const gptResponse = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: messages,
            max_tokens: 500,
            temperature: 0.5,
        });

        return gptResponse.choices[0].message.content.trim(); // Return suggested new content
    } catch (error) {
        console.error('Error interacting with OpenAI:', error);
        throw new Error('Failed to suggest new content');
    }
};
