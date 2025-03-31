const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_uDK4EHaVGwje58',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'tAijWVHOFWaxJkYBdgQ6TqF4'
});

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Payment route working!' });
});

// Create order
router.post('/create-order', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const { amount } = req.body;

    if (!amount) {
      console.error('Amount is required');
      return res.status(400).json({ error: 'Amount is required' });
    }

    const options = {
      amount: amount,
      currency: 'INR',
      receipt: 'order_' + Date.now(),
    };

    console.log('Creating order with options:', options);

    const order = await razorpay.orders.create(options);
    console.log('Order created:', order);
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post('/verify-payment', async (req, res) => {
  try {
    console.log('Verify payment request received:', req.body);
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.json({ 
        success: true, 
        message: "Payment verified successfully" 
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: "Invalid signature" 
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error verifying payment',
      error: error.message 
    });
  }
});

module.exports = router; 