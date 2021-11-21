const Review = require('.//..//Models//reviewsModel');
const factory = require('./HandlerFactory');

exports.setPostUserIds = (req, res, next) => {
  //allow nested Routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.CreateReview = factory.CreateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.UpdateOne(Review);
