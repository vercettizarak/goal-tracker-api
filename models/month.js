const mongoose = require('mongoose');

const MonthSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
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

module.exports = mongoose.model('Month', MonthSchema);
