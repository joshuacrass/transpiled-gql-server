// models/Article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  // Include other fields as necessary
});

module.exports = mongoose.model('Article', articleSchema);
