import Razorpay from 'razorpay';
import { createHmac } from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
    });

    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify payment
app.post('/api/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified
      // Update your database here
      res.json({ status: 'success' });
    } else {
      res.status(400).json({ error: 'Payment verification failed' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 