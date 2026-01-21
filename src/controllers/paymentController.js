const Transaction = require('../models/Transaction');

// @desc    Create a payment transaction (Mock)
// @route   POST /api/payments
// @access  Private
const createPayment = async (req, res) => {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
        return res.status(400).json({ message: 'Please provide amount and currency' });
    }

    try {
        // Mock Stripe ID
        const stripeId = `ch_${Math.random().toString(36).substr(2, 9)}`;

        const transaction = await Transaction.create({
            user: req.user._id,
            amount,
            currency,
            status: 'completed', // Mocking success
            stripeId,
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user transactions
// @route   GET /api/payments
// @access  Private
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all transactions (Admin only)
// @route   GET /api/payments/all
// @access  Private/Admin
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('user', 'username email');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPayment, getTransactions, getAllTransactions };
