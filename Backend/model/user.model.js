import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName : {
        type: 'string',
        required: true
    },
    email : {
        type: 'string',
        required: true,
        unique: true
    },
    password : {
        type: 'string',
        required: true
    },

})

const User = mongoose.model("User", userSchema)
export default User;