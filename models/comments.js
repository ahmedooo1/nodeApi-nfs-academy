const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: String, required: true },
    thingId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Comments', commentSchema);