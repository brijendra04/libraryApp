import express from 'express';
import Razorpay from 'razorpay';
import {bookingModel} from 'bookingModel.js';

const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create payment order
router.post('/createOrder', async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, 
      currency: 'INR',
      receipt: `receipt_${new Date().getTime()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    res.status(500).json({ error: 'Payment creation failed' });
  }
});

export default router;
