const mongoose = require('mongoose');

const ContactUs = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'There must be a name ']
    },
    email: {
      type: String,
      required: [true, 'there must be a email']
    },
    date: {
      type: Date,
      default: Date.now()
    },
    message: {
      type: String,
      trim: true,
      required: [true, 'there must be a message']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Messages = mongoose.model('Message', ContactUs);
module.exports = Messages;
