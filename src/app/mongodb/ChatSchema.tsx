const mongoose = require('mongoose');

const chatSchemas = new mongoose.Schema({
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application'}, // Reference to the application
  sender: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be either jobSeeker or employer
  receiver: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be either jobSeeker or employer
  message: { type: String},
  timestamp: { type: Date, default: Date.now },
  room:{type:String},
});

export const ChatSchema=mongoose.models.chats|| mongoose.model('chats', chatSchemas);