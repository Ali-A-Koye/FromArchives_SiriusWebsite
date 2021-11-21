const multer = require('multer');
const sharp = require('sharp');
const AppError = require('./../utils/error');
const catchAsync = require('../utils/CatchAsync');
const User = require('../Models/UserModel');
const factory = require('./HandlerFactory');

/*const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users/');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  }
}); */
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please Upload Only Images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeuserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

const FilterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined! please use sign up instead'
  });
};
exports.getUser = factory.getOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)create error if user posts password data
  if (req.body.Password || req.body.PasswordConfirm)
    return next(
      new AppError(
        'this Route is not for Password Updates . please Change Password Route!',
        400
      )
    );

  const FilteredBody = FilterObj(
    req.body,
    'name',
    'Email',
    'likes',
    'bio',
    'active'
  );

  if (req.file) FilteredBody.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, FilteredBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getAllUsers = factory.getAll(User);
//DO NOT UPDATE PASSWORDS WITH THIS
exports.UpdateUser = factory.UpdateOne(User);
exports.deleteUser = factory.deleteOne(User);
