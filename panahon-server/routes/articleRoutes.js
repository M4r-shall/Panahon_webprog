const express = require('express');
const { getArticles, getArticleBySlug, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);
router.get('/slug/:slug', getArticleBySlug);
router.get('/id/:id', getArticleById);
router.route('/:id').put(updateArticle).delete(deleteArticle);

module.exports = router;
