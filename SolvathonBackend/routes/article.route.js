import express from 'express';
import { analyzeArticle,saveArticleData,analyzeAll,fetchAllArticles } from '../controllers/article.controller.js'; // Import the controller function

const router = express.Router();

// Route to analyze an article
router.post('/analyzeNow', analyzeArticle);
router.post('/saveData', saveArticleData);
router.post('/analyzeAll', analyzeAll);
router.get("/fetchData",fetchAllArticles);

export default router;
