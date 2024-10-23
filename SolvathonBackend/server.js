import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import articleRoutes from './routes/article.route.js';
import { syncDatabase } from './sync.js';  // Import the sync function

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    // origin: process.env.FRONTEND_URL,
    origin: 'http://localhost:5173', // Allow your frontend origin
    credentials: true // Allow credentials (cookies, auth headers)
}));

// Sync the database and create tables
syncDatabase();
app.use('/api/article', articleRoutes);

const PORT = process.env.PORT_SERVER || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
