import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.GPT_4O_API_KEY,
});

const testAPI = async () => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: 'Hello, how are you?' }],
        });
        console.log(response.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error);
    }
};

testAPI();
