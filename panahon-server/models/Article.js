const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    slug: { type: String, unique: true, sparse: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    link: { type: String, default: '' },
    paragraphs: { type: [String], default: [] },
    image: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Article', articleSchema);
