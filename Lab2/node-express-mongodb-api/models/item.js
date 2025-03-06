const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String},
  itemDescription: { type: String }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;