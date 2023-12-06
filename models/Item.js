// models/item.js

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  question: {type: String, required: true},
  imagePath: {type: String, required: true},
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;