const mongoose = require('mongoose');
const Item = require('./item');

const itemSchema = new mongoose.Schema({
  customerId: { type: String },
  orderDate: { type: String },
  items: { type: Object },
  remainingBalance: {type: Number}
});

const Order = mongoose.model('Order', itemSchema);

module.exports = Order;