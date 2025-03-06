const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

/**
    * @swagger
    * components:
    *   schemas:
    *     Customer:
    *       type: object
    *       properties:
    *         firstName:
    *           type: string
    *           description: The customer's first name
    *         lastName:
    *           type: string
    *           description: The customer's last name
    *         addressLine1:
    *           type: string
    *           description: The first line of the customers address
    *         addressLine2:
    *           type: string
    *           description: The second line of the customers address
    *         state:
    *           type: string
    *           description: The name of the state which the customers address is in
    *         zip:
    *           type: string
    *           description: The customers zip code
    */


/**
    * @swagger
    * /customers/create_customer:
    *   post:
    *     summary: create a customer
    *     requestBody: 
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Customer'
    *     responses:
    *       201:
    *         description: Confirmation message and the customer object
    *       400:
    *         description: Generic error
    */
// Create a new customer
router.post('/create_customer', async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({"message": "Customer created!", "customer": newCustomer});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/**
    * @swagger
    * /customers/get_all_customers:
    *   get:
    *     summary: gets all the customers
    *     responses:
    *       200:
    *         description: list of all customers in the database
    *       500:
    *         description: Generic error
    */
// Get all customers
router.get('/get_all_customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;