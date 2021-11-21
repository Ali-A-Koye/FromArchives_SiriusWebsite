const express = require('express');

const Router = express.Router({
  mergeParams: true
});
const ReviewsController = require('../controllers/ReviewsController');
const authController = require('../controllers/aythController');

Router.use(authController.protect);
Router.route('/')
  .get(ReviewsController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    ReviewsController.setPostUserIds,
    ReviewsController.CreateReview
  );

Router.route('/:id')
  .get(ReviewsController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    ReviewsController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    ReviewsController.deleteReview
  );
module.exports = Router;
