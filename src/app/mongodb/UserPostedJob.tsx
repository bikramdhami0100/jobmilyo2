import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobtitle: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  qualification: {
    type: String,
    required: true,
    trim: true
  },
  last_date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
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
  number_of_post: {
    type: Number,
    default:null
  },
  experience: {
    type: String,
    // required: true,
    trim: true
  },
  specialization_req: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
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
  state: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usersignups',
    // required: true
  },
  postedby:{
    type:String,
    defalul:null,
  },
  site: {
    type: String,
    trim: true
  },
  no_of_workingemployee: {
    type: Number,
    trim: true
  },
  no_of_office: {
    type: Number,
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  interestedEmploymentTypes: {
    type: String,
    trim: true
  },
  no_vacancy: {
    type: Number,
    trim: true
  },
  jobupload: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
const UserPostedJob = mongoose.models.postajobs || mongoose.model('postajobs', jobSchema);
export default UserPostedJob

