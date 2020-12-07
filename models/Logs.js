const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Log Text is required'],
  },
  priority: {
    type: String,
    defaul: 'low',
    enum: ['low', 'moderate', 'high'],
  },
  user: {
    type: String,
    trim: true,
    required: [true, 'User is required'],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Log', LogSchema);
