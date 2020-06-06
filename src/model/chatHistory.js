const mongoose = require('mongoose');

const chatHistorySchema = mongoose.Schema({
  emitterId: mongoose.Schema.Types.ObjectId,
  targetId: mongoose.Schema.Types.ObjectId,
  timestamp: { type: Date, default: Date.now },
  content: String,
});

export { chatHistorySchema };
