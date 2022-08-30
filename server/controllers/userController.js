const User = require("./../models/userModel");
const Contact = require("./../models/contactModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const filterObj = require("./../utils/filterFields");
const { cloudinary } = require("./imageController");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().sort("-created_at");
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: req.params.id,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1.create error if user try to update the password
  if (req.body.password || req.body.confirmPassword) {
    return new AppError(
      "This routes is not for password updates.Please use /updateMyPassword",
      400
    );
  }

  const user = await User.findById(req.user.id);
  //.filtered out unwanted fields names that dont need to be updated for eg role
  const filteredObj = filterObj(req.body, "name", "birthday", "phoneNumber");
  if (req.file) filteredObj.photo = req.photo;
  if (req.body.eventsList)
    filteredObj.eventsList = [...user.eventsList, ...req.body.eventsList];

  //2..if password is not posted we need to update the user
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);
  await Contact.deleteMany({ user: req.user.id });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
