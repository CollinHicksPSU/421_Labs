const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const Order = require('../models/order');

/**
    * @swagger
    * components:
    *   schemas:
    *     Payment:
    *       type: object
    *       properties:
    *         customerId:
    *           type: string
    *           description: The customer ID for the payment method
    *         creditCardNumber:
    *           type: string
    *           description: the credit card number, in the form xxxx-xxxx-xxxx-xxxx
    */


/**
    * @swagger
    * /payments/new_payment:
    *   post:
    *     summary: create a new payment method for a customer
    *     requestBody: 
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Payment'
    *     responses:
    *       201:
    *         description: Confirmation message, and the ID for the newly created payment method
    *       400:
    *         description: Generic error
    */
// Submit a payment
router.post('/new_payment', async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);
    res.status(201).json({'message': 'payment created!', 'paymentId': newPayment._id});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/**
    * @swagger
    * /payments/charge:
    *   put:
    *     summary: charge a payment method for a specified order
    *     requestBody: 
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             properties:
    *               paymentId: 
    *                 type: string
    *                 description: string format of an objectId of a payment method
    *               orderId:
    *                 type: string
    *                 description: string format of an objectId of an order
    *     responses:
    *       201:
    *         description: Confirmation message
    *       400:
    *         description: Generic error
    *       401:
    *         description: Payment method does not exist.
    *       404:
    *         description: Order does not exist.
    */
//Charge the card
router.put('/charge', async (req, res) =>{
  try {
    try{
      const payment = await Payment.findById(req.body.paymentId);
    } catch (err){
      return res.status(401).json({ message: 'Cannot Find Payment.' });
    }
    setTimeout(async () => {}, 3000); //simulate card payment processing
    const orderId = req.body.orderId;
    const order = await Order.findByIdAndUpdate(orderId, {remainingBalance: 0 }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(201).json('payment completed');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})



module.exports = router;