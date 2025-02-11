const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  jobSeeker: { type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }, // Status of the application
  appliedAt: { type: Date, default: Date.now },
  chatEnabled: { type: Boolean, default: false } // Enable chat when application is submitted
});

export const ApplicationSchema =mongoose.models.applications|| mongoose.model('applications', applicationSchema);