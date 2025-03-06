// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

/**
    * @swagger
    * components:
    *   schemas:
    *     Order:
    *       type: object
    *       properties:
    *         customerId:
    *           type: string
    *           description: The customer ID for the order
    *         orderDate:
    *           type: string
    *           description: date of the order in the form mm/dd/yyyy
    *         items:
    *           type: Item
    *           description: list of items in the order
    *         remainingBalance:
    *           type: number
    *           description: remaining balance to be paid for the order
    *     Item:
    *       type: object
    *       properties:
    *         name: 
    *           type: string
    *           description: Name of the item.
    *         itemDescription:
    *           type: string
    *           description: Description of the item.
    */



/**
    * @swagger
    * /orders/new_order:
    *   post:
    *     summary: create a new order
    *     requestBody: 
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Order'
    *     responses:
    *       201:
    *         description: Confirmation message with the ID of the new order, and the Order object that was created.
    *       400:
    *         description: Generic error
    */
// Create an order
router.post('/create_order', async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({"message":"Order placed successfully! OrderID: ".concat(newOrder._id),"order":newOrder});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
    * @swagger
    * /orders/delete_order:
    *   delete:
    *     summary: create an order
    *     requestBody: 
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             properties:
    *              orderId:
    *                type: string
    *                description: string of the objectId of the order to be deleted
    *     responses:
    *       200:
    *         description: Confirmation message.
    *       400:
    *         description: Generic error
    */
// Cancel an order
router.delete('/delete_order/', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.body.orderId);
    res.status(200).json({ message: 'Order canceled' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
    * @swagger
    * /orders/get_all_orders:
    *   get:
    *     summary: create an order
    *     requestBody: 
    *       required: false
    *     responses:
    *       200:
    *         description: List of all orders.
    *       400:
    *         description: Generic error
    */
router.get('/get_all_orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

module.exports = router;
