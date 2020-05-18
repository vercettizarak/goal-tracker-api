const mongoose = require('mongoose');

var DaySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  data: {
    type: String,
    required: true,
  },
  tasks: [mongoose.Schema.Types.Mixed],
  num: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Day', DaySchema);
