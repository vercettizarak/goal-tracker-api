const mongoose = require('mongoose');

const WeekSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  data: {
    type: String,
    require: true,
  },
  num: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Week', WeekSchema);
