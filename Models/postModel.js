const slugify = require('slugify');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
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
    Author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    coverPhoto: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
postSchema.index({ title: 1 });
postSchema.index({ slug: 1 });

postSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'Author',
    select: '-__v'
  });
  next();
});

postSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'post',
  localField: '_id'
});
const Posts = mongoose.model('Post', postSchema);

module.exports = Posts;
