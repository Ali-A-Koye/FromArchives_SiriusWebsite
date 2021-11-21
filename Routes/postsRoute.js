const express = require('express');

const Router = express.Router({
  mergeParams: true
});

const postsController = require('../controllers/postController');
const authController = require('../controllers/aythController');
const reviewRoute = require('./../Routes/reviewRoute');

Router.use('/:postId/reviews', reviewRoute);

Router.route('/')
  .get(postsController.getAllPosts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    postsController.CreatePost
  );
Router.route('/news')
  .get(postsController.getAllnews)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    postsController.Createnews
  );
Router.route('/email').post(postsController.emails);
Router.route('/contacts').post(postsController.Messages);
Router.route('/:id')
  .get(postsController.getPost)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    postsController.updatePost
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    postsController.deletePost
  );

module.exports = Router;
