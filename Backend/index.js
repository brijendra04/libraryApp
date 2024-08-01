import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();

import bookRoute from './route/book.route.js'
dotenv.config();
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

    try{
        mongoose.connect(URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });

        console.log("Connected to mongodb");

    }catch(error){
            console.log("Error: " + error);
    }

app.use("/book", bookRoute)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})