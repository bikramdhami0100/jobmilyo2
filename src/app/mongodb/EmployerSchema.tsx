import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company_logo: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
 
  company: {
    type: String,
    required: true,
    trim: true
  },
  rating:{
   type:Number,
   default:0
  },
  phonenumber:{
  type:Number,
  required:true
  },
  website_url: {
    type: String,
    // required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  employeruser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usersignups',
    // required: true
  },
  site: {
    type: String,
    trim: true
  }

}, {
  timestamps: true
});
const EmployerSchema = mongoose.models.employer || mongoose.model('employer', jobSchema);
export default EmployerSchema;

