const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  customerId: {type:String},
  creditCardNumber: {type:String}
});

const Payment = mongoose.model('Payment', itemSchema);

module.exports = Payment;