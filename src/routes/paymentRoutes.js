const express = require('express');
const router = express.Router();
const { createPayment, getTransactions, getAllTransactions } = require('../controllers/paymentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/', protect, createPayment);
router.get('/', protect, getTransactions);
router.get('/all', protect, authorize('admin'), getAllTransactions);

module.exports = router;
