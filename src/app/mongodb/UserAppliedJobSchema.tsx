import mongoose from "mongoose";

const userAppliedJobSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'postajobs',
    required: true,
    unique:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usersignups',
    required: true
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Applied',"pending", 'Interviewed', 'Hired', 'Rejected'],
    default: 'Applied'
  },
  resume: {
    type: String, // URL or path to the resume
    trim: true,
    required:true
  },
  room:{
    type:String,
  },
  chatEnabled: { type: Boolean, default: false }

}, {
  timestamps: true
});

const UserAppliedJob = mongoose.models.userappliedjobs || mongoose.model('userappliedjobs', userAppliedJobSchema);
export default UserAppliedJob;
