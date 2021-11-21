const Post = require('.//..//Models//postModel');
const news = require('.//..//Models//newsModel');
const email = require('.//..//Models//EmailsModel');

const message = require('.//..//Models//ContactUsModel');

const catchAsync = require('../utils/CatchAsync');
const factory = require('./HandlerFactory');
const APIFeatures = require('./../utils/apiFeatures');

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

//----------------------------------------------------------------

//exports.getAllPosts = factory.getAll(Post);
exports.getPost = factory.getOne(Post, { path: 'reviews' });
exports.CreatePost = factory.CreateOne(Post);
exports.Messages = factory.CreateOne(message);
exports.updatePost = factory.UpdateOne(Post);
exports.deletePost = factory.deleteOne(Post);

exports.getAllPosts = catchAsync(async (req, res, next) => {
  let Posts;
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    // Get all campgrounds from DB
    Posts = await Post.find(
      {
        title: regex
      },
      { title: 1, slug: 1 }
    ).limit(10);
    /*  if (Posts.length === 0)
      return next(new AppError('Sorry No post has been found', 404)); */
  } else {
    var features = new APIFeatures(Post.find(), req.query).filter();
    Posts = await features.query;
  }

  res.status(200).json(Posts);
});

exports.getAllnews = factory.getAll(news);
exports.Createnews = factory.CreateOne(news);
exports.emails = factory.CreateOne(email);
