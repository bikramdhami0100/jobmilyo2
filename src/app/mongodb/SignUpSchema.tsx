import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
     color: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userVerify: {
        type: Boolean,
        default: false,
    },
   userType:{
    type: String,
    enum: ['admin',"seeker", 'employer'],
    default: 'seeker'
   },
    contactDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usercontacts"
    },
  
  
});

// Create the model
 const Usersignup=mongoose.models.usersignups|| mongoose.model('usersignups', userSchema);

export default Usersignup;