import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bookRoute from './route/book.route.js'
import userRoute from './route/user.route.js'

const app = express()

app.use(cors(
    {
        // origin: ["https://libraryapp-eosin.vercel.app/"],
        origin: ["http://localhost:5173","https://libraryapp-eosin.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true
    }

));
app.use(express.json());



dotenv.config();
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;


mongoose.connect(URI).then(() => {
    console.log("Connected to mongodb");
}).catch((error) => {
    console.error("Error connecting to mongodb: ", error);
});

app.use("/book", bookRoute);
app.use("/user", userRoute);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})