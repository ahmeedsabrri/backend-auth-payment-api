const express = require('express');
const router = express.Router();
const { createPayment, getTransactions, getAllTransactions } = require('../controllers/paymentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment transaction management
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment transaction
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Invalid input
 */
router.post('/', protect, createPayment);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get user transactions
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get('/', protect, getTransactions);

/**
 * @swagger
 * /payments/all:
 *   get:
 *     summary: Get all transactions (Admin only)
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of all transactions
 *       403:
 *         description: Not authorized
 */
router.get('/all', protect, authorize('admin'), getAllTransactions);

module.exports = router;
