const express = require('express');
const {
    rechargepayment
} = require('../controllers/rechargepayment');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Generate OTP for login or registration
router.get('payment', rechargepayment);


module.exports = router;