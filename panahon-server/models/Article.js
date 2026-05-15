const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    paragraphs: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Article', articleSchema);
