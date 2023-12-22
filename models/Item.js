// models/item.js

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fathername: { type: String, required: true },
  email: { type: String, required: true },
  district: { type: String, required: true },
  constituencyType: { type: String, required: true },
  constituency: { type: String, required: true },
  message: { type: String, required: true },
  question: {type: String, required: true},
  imagePath: {type: String, required: true},
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;