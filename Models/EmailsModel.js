const mongoose = require('mongoose');

const emails = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please Enter Your Email to Subscribe'],
      unique: true
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const email = mongoose.model('Email', emails);
module.exports = email;
