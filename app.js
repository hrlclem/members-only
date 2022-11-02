require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var passport = require("passport");
var session = require("express-session");
var LocalStrategy = require("passport-local").Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

var logger = require('morgan');
var bcrypt = require("bcryptjs");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

const User = require("./models/user");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Auth setup
app.use(session({ 
  name: 'sessionCookie',
  secret: `${process.env.SECRET_SESSION}`, 
  resave: true, 
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


// server setup
app.use(logger('dev'));
app.use(cookieParser(`${process.env.SECRET_SESSION}`));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to access USER
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Router setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.get("/auth/nologin", (req, res) => res.render("nologin"));
// app.get("/auth/premium", (req, res) => res.render("add_premium"));


//Local Strategy authentification
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, 
      (err, user) => {
      if (err) { return done(err) }
      if (!user) { return done(null, false, { message: "Incorrect email" }) }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err);
        if (res) return done(null, user);
        else return done(null, false, { message: "Incorrect password" });
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    if(err){
        done(null, false, {error:err});

    } else {
        done(null, user);
    }
  })
});

app.post("/log-in",
    passport.authenticate("local", {
      session: true,
      successRedirect: "/users/profile",
      failureRedirect: "/auth/nologin",
  })
);

app.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Import mongoose module
const mongoose = require("mongoose");
// Set up default mongoose connection
const mongoDB = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@inventory-app.tdcky6s.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the default connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


module.exports = app;
