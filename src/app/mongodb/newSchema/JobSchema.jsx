const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true }, // Reference to the employer who posted the job
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker' }], // Job seekers who applied for this job
  createdAt: { type: Date, default: Date.now }
});
export const JobSchema =mongoose.models.jobs|| mongoose.model('jobs', jobSchema);