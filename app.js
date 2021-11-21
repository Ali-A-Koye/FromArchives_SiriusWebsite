//.............TOP LEVEL CODE................
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

const compression = require('compression');
const hpp = require('hpp');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/error');

//Start Express App
const app = express();
//
//
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//
//

const tourRouter = require('./Routes/tourRoutes');
const postRouter = require('./Routes/postsRoute');
const userRouter = require('./Routes/userRoutes');
const reviewRoute = require('./Routes/reviewRoute');
const viewRoute = require('./Routes/viewRoute');

//
//
app.use(
  express.json({
    limit: '10kb'
  })
);
app.use(cookieParser());
//app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      'title',
      'type',
      'PostContent',
      'Postbody',
      'slug',
      'coverPhoto'
    ]
  })
);

app.use(compression());
app.use(express.static(`${__dirname}/public`));
app.use(helmet());
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'too Many requests from this IP , please try again in one hours'
});
app.use('/api', limiter);
//
//
//
//
//
app.use('/', viewRoute);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/posts', postRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on the Website`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
