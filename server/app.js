const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const contactRouter = require("./routes/contactRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Set security HTTP headers
app.use(cookieParser());
app.use(helmet());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Data santization against xss and noSQLserver attacks
app.use(xss());
app.use(mongoSanitize());

mongoose.connect("mongodb://localhost:27017/contacts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/contacts", contactRouter);
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `The application started successfully on port ${process.env.PORT || 3000}`
  );
});
