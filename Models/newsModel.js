const slugify = require('slugify');
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post must have a title']
    },
    slug: String,
    type: {
      type: String,
      required: [true, 'a Post must have a type']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    PostContent: {
      type: String,
      trim: true
    },
    Postbody: {
      type: String,
      trim: true
    },
    Author: String,
    coverPhoto: String,
    url: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
newsSchema.index({ slug: 1 });

newsSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

newsSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'post',
  localField: '_id'
});
const news = mongoose.model('news', newsSchema);

module.exports = news;
