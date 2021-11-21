const express = require('express');

const router = express.Router();
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/aythController');

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get(
  '/forgotPassword',
  authController.isLoggedIn,
  viewsController.forgotPassword
);
router.get(
  '/users/resetPassword/:token',
  authController.isLoggedIn,
  viewsController.resetPassword
);
router.get('/results', authController.isLoggedIn, viewsController.ResultsPage);
router.get('/page/:slug', authController.isLoggedIn, viewsController.getPost);
router.get('/users/:id', authController.protect, viewsController.UserPage);
router.get('/login', authController.isLoggedIn, viewsController.login);
router.get('/Posts', authController.isLoggedIn, viewsController.AllPosts);
router.get('/contact', authController.isLoggedIn, viewsController.contact);
router.get('/login', authController.isLoggedIn, viewsController.login);
router.get('/signup', authController.isLoggedIn, viewsController.signup);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/chat', authController.protect, viewsController.chat);
router.get(
  '/changePassword',
  authController.protect,
  viewsController.changepass
);
router.get('/ChangeInfo', authController.protect, viewsController.ChangeInfo);
//----------------------------------------------------------------
router.get('/deleteMe', authController.protect, viewsController.deleteMe);

module.exports = router;
