import mongoose from "mongoose";

const userContactSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usersignups',
      required: true
    },
    userName:{
        type:String,
        required:true
    },
 
    email:{
        type:String,
        required:true,
        trim:true
    },
    message:{
        type:String,
        required:true,
        
    }
  }, {
    timestamps: true
  });
  
  const UserContact = mongoose.models.usercontacts || mongoose.model('usercontacts', userContactSchema);
  export default UserContact;
  