const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  state: {type: String},
  zip: {type: String},
});

const Customer = mongoose.model('Customer', itemSchema);

module.exports = Customer;