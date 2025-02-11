const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }], // Jobs posted by the employer
  createdAt: { type: Date, default: Date.now }
});

export const EmployerSchema =mongoose.models.employers|| mongoose.model('employers', employerSchema);