const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mission: String,
  status: {
    day: {
      type: Number,
      default: 0,
    },
    week: {
      type: Number,
      default: 0,
    },
    month: {
      type: Number,
      default: 0,
    },
    quarter: {
      type: Number,
      default: 0,
    },
    year: {
      type: Number,
      default: 0,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
