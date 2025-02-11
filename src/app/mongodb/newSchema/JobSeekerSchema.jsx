const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: [{ type: String }],
  resume: { type: String }, // URL or file path to the resume
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }], // Jobs applied by the job seeker
  createdAt: { type: Date, default: Date.now }
});

export const JobSeekerSchema =mongoose.models.jobseekers || mongoose.model('jobseekers', jobSeekerSchema);