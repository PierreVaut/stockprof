const mongoose = require('mongoose');

export const timelineSchema = mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  content: String,
  author: String,
  authorId: mongoose.Schema.Types.ObjectId,
  authorEmail: String,
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  comment: {},
});

