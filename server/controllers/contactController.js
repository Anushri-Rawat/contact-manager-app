const Contact = require("./../models/contactModel");
const catchAsync = require("./../utils/catchAsync");
const filterFields = require("./../utils/filterFields");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const mongoose = require("mongoose");

exports.setUserIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.getAllContacts = catchAsync(async (req, res, next) => {
  let filter = { user: req.user.id };
  const features = new APIFeatures(Contact.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const contacts = await features.query;
  res.status(200).json({
    status: "success",
    results: contacts.length,
    data: contacts,
  });
});

exports.getContact = catchAsync(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return next(new AppError("No contact found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: contact,
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    data: newContact,
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const filterObj = filterFields(
    req.body,
    "phone_number",
    "address",
    "city",
    "country",
    "category"
  );
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { ...filterObj, updated_at: Date.now() },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!contact) {
    return next(new AppError("No Conatct found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: contact,
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);

  if (!deletedContact) {
    return next(new AppError("No Contact found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: req.params.id,
  });
});

exports.groupContactsCategory = catchAsync(async (req, res, next) => {
  const val = mongoose.Types.ObjectId(req.user.id);
  const category = await Contact.aggregate([
    { $match: { user: val } },
    {
      $group: {
        _id: { $toUpper: "$category" },
        numContacts: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    category,
  });
});
