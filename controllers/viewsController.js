const Post = require('../Models/postModel');
const User = require('../Models/UserModel');

const news = require('../Models/newsModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('../utils/error');

const catchAsync = require('../utils/CatchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  //1) Get tour data from collection
  const requrl = req.url;
  const Posts = await Post.find();
  const News = await news.find();
  //2) build templated news
  //3)render that template using tour data from 1)
  res.status(200).render('HomePage', {
    title: 'Posts',
    Posts,
    requrl,
    News
  });
});

exports.AllPosts = catchAsync(async (req, res, next) => {
  //1) Get tour data from collection
  const Posts = await Post.find();
  let url = req.url;
  const requrl = req.url;
  let jor;
  if (url.startsWith('/Posts?type=')) {
    jor = requrl.split('=')[1];
    if (jor.split('&')) {
      jor = jor.split('&')[0];
    }
    if (!url.includes('page=')) url = `/Posts?type=${jor}&page=1`;
  }

  if (url === ('/Posts' || '/posts')) url = 'Posts?page=1';

  if (url.startsWith('/Posts?type=')) {
    url = url.split('=')[2];
  } else {
    url = url.split('=')[1];
  }
  const features = new APIFeatures(Post.find(), req.query)
    .filter()
    .pagination();
  const PostsPage = await features.query;
  let PostsperPagelimit;
  if (jor) {
    req.query.limit = Posts.length;
    if (req.query.page) req.query.page = 1;
    const PostsperPage = new APIFeatures(Post.find(), req.query)
      .filter()
      .pagination();
    PostsperPagelimit = await PostsperPage.query;
  } else {
    PostsperPagelimit = '';
  }

  res.status(200).render('AllPosts', {
    title: 'Posts Page',
    PostsPage,
    Posts,
    url,
    requrl,
    PostsperPagelimit,
    jor
  });
});

exports.contact = catchAsync(async (req, res, next) => {
  const Posts = await Post.find();
  const requrl = req.url;
  res.status(200).render('contact', {
    title: 'Contact page',
    Posts,
    requrl
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const requrl = req.url;

  const Posts = await Post.find();
  res.status(200).render('login', {
    title: 'Login Page',
    Posts,
    requrl
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const Posts = await Post.find();
  const requrl = req.url;

  res.status(200).render('signup', {
    title: 'Login Page',
    Posts,
    requrl
  });
});

exports.getAccount = async (req, res) => {
  const Posts = await Post.find();
  const requrl = req.url;
  res.status(200).render('profile', {
    title: 'Your Account',
    Posts,
    requrl
  });
};

exports.updateUserdata = catchAsync(async (req, res, next) => {
  const requrl = req.url;
  res.status(200).render('account', {
    title: 'Your Account',
    requrl
  });
});

exports.changepass = catchAsync(async (req, res, next) => {
  const requrl = req.url;
  const Posts = await Post.find();
  res.status(200).render('ChangePass', {
    title: 'password change Page',
    Posts,
    requrl
  });
});

exports.ChangeInfo = catchAsync(async (req, res, next) => {
  const Posts = await Post.find();
  const requrl = req.url;
  res.status(200).render('ChangeInfo', {
    title: 'Change your Info',
    Posts,
    requrl
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const Posts = await Post.find();
  const requrl = req.url;
  const opost = await Post.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review _id user'
  });
  let UserCheck = res.locals.user;
  if (!UserCheck) UserCheck = { _id: ' ' };
  if (!opost) {
    return next(new AppError('There is no Post with that name', 404));
  }

  res.status(200).render('PostSingle', {
    title: `${opost.title}`,
    opost,
    Posts,
    UserCheck,
    requrl
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const Posts = await Post.find();
  const requrl = req.url;

  res.status(200).render('delete', {
    title: 'delete',
    Posts,
    requrl
  });
});

exports.chat = catchAsync(async (req, res, next) => {
  const Posts = await Post.find();
  const requrl = req.url;

  //var io = req.app.get('socketio');
  res.status(200).render('globalchat', {
    title: 'chat',
    Posts,
    requrl
  });
});
//----------------------------------------------------------------
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

exports.ResultsPage2 = catchAsync(async (req, res, next) => {
  let url = req.url;
  const requrl = req.url;
  const Posts = await Post.find();

  let ResultPost;
  const regex = new RegExp(escapeRegex(req.query.search), 'gi');
  // Get all campgrounds from DB
  ResultPost = await Post.find({ title: regex }, { title: 1 }).limit(10);
  if (ResultPost.length === 0) ResultPost = await Post.find();
  let PostsperPagelimit;
  if (req.query.page) {
    const PostsperPage = new APIFeatures(ResultPost, req.query)
      .filter()
      .pagination();
    PostsperPagelimit = await PostsperPage.query;
  } else {
    PostsperPagelimit = '';
  }

  res.status(200).render('Results', {
    title: 'Results',
    Posts,
    ResultPost,
    url,
    requrl
  });
});

exports.ResultsPage = catchAsync(async (req, res, next) => {
  const requrl = req.url;
  const Posts = await Post.find();

  const regex = new RegExp(escapeRegex(req.query.search), 'gi');
  // Get all campgrounds from DB
  const result = new APIFeatures(Post.find({ title: regex }), req.query);
  let ResultPost = await result.query;
  if (requrl === '/results?search=') ResultPost = [];

  res.status(200).render('Results', {
    title: 'Results',
    Posts,
    ResultPost,
    requrl
  });
});

exports.UserPage = catchAsync(async (req, res, next) => {
  const Posts = await Post.find();
  const requrl = req.url;
  const userfound = await User.findOne({ _id: req.params.id });
  res.status(200).render('userpage', {
    title: 'userpage',
    Posts,
    requrl,
    userfound
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const Posts = await Post.find();
  const requrl = req.url;
  res.status(200).render('resetpass', {
    title: 'userpage',
    Posts,
    requrl
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const Posts = await Post.find();
  const requrl = req.url;
  const token = requrl.split('/')[3];
  res.status(200).render('chngresetpass', {
    title: 'userpage',
    Posts,
    requrl,
    token
  });
});
