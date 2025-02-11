const mongoose = require('mongoose');

const videoCallSchema = new mongoose.Schema({
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true }, // Reference to the application
  initiator: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be either jobSeeker or employer
  recipient: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be either jobSeeker or employer
  callStartTime: { type: Date, default: Date.now },
  callEndTime: { type: Date },
  status: { type: String, enum: ['scheduled', 'ongoing', 'completed'], default: 'scheduled' }
});

export const  VideoSchema =mongoose.models.videocalls|| mongoose.model('videocalls', videoCallSchema);