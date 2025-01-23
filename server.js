const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const commentRoutes = require("./routes/comments");
const snorkelingSpots = require("./data/spots");

// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

// Connect To Database
connectDB();

// Using EJS for views
app.set("view engine", "ejs");

// Static Folder
app.use(express.static("public"));

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging
app.use(logger("dev"));

// Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.DB_STRING,
    }),
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Middleware to make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Routes
app.use("/", mainRoutes);
app.use("/comments", commentRoutes);



// Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});