const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");

const contactSchema = new mongoose.Schema({
  contact_name: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: false,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  // photo: {
  //   type: String,
  //   default:
  //     "http://res.cloudinary.com/drz6w1d5q/image/upload/v1661002817/user-62f279e3a337b58b258c5dec-1661002815185.jpeg.jpg",
  // },
  //but a person can have more than one number
  phone_number: {
    type: [String],
    // length: [10, "A phone number must have only 10 digits"],
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)?\d{4}$/,
    // validate: [
    //   validator.isMobilePhone,
    //   "A phone number must have only 10 digits",
    // ],
  },
  address: String,
  city: String,
  country: String,
  state: String,
  category: {
    type: String,
    required: [true, "A contact must have a category"],
    enum: {
      values: ["Family", "Friends", "Buisness", "Others"],
      message: "category is either:friends,family,buisness,others",
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "contact must belong to a user"],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

// contactSchema.pre("save", async function (next) {
//   const userPromises = this.user.map(async (id) => {
//     await User.findById(id);
//   });
//   this.user = await Promise.all(userPromises);
//   next();
// });

contactSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});
contactSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
