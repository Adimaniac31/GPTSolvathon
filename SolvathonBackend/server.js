import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { syncDatabase } from './sync.js';  // Import the sync function

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Sync the database and create tables
syncDatabase();

const PORT = process.env.PORT_SERVER || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
