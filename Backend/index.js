import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';

const app = express();
app.use(cors());

// CORS setup
app.use(cors({
        origin: ["http://localhost:5173","https://libraryapp-eosin.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true
}));

app.use(express.json());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,  
    key_secret: process.env.RAZORPAY_KEY_SECRET,  
});

mongoose.connect(URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB: ", error);
    });

app.post('/create-order', async (req, res) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    try {
        const order = await razorpay.orders.create({
            amount: amount * 100,  
            currency: 'INR',
            receipt: `order_rcptid_${Math.random()}`,
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order', message: error.message });
    }
});

app.get('/get-payment-id', async (req, res) => {
    try {
        const payment_id = req.query.payment_id;
        const order_id = req.query.order_id;
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(order_id + "|" + payment_id)
            .digest('hex');
        res.status(200).json({ signature: generated_signature });   
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate signature', message: error.message });
    }
});


app.post('/verify-payment', (req, res) => {
    const { payment_id, order_id, signature } = req.body;
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(order_id + "|" + payment_id)
        .digest('hex');

    if (generated_signature === signature) {
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
});

// Routes for books and users
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
