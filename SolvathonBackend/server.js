import express from 'express';
import mysql from 'mysql2/promise';
import openai from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// MySQL Connection using async/await and ES6+ syntax
const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'content_db'
        });
        console.log('Connected to MySQL');
        return connection;
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
};

// Establish the connection
let db;
connectDB().then(connection => db = connection).catch(err => process.exit(1));

// Route to analyze article using async/await and arrow functions
app.post('/analyze', async (req, res) => {
    const { title, content } = req.body;

    try {
        const prompt = `Analyze the following article for outdated information, broken links, obsolete industry terms, and suggest corrections: ${content}`;
        
        const gptResponse = await openai.Completion.create({
            model: 'gpt-4',
            prompt,
            max_tokens: 1000,
            temperature: 0.5
        });

        const analysis = gptResponse.choices[0].text;

        // Save analysis to MySQL using prepared statements
        const [result] = await db.execute(
            'INSERT INTO articles (title, content, analysis) VALUES (?, ?, ?)',
            [title, content, analysis]
        );

        res.json({ id: result.insertId, analysis });
    } catch (error) {
        console.error('Error analyzing article or saving to MySQL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Starting the server using an arrow function
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
