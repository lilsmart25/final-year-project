var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import packages
const chalk = require('chalk')
const mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const {config} = require('./database/config')

// auth
require('./config/passport');

// Route Import
var indexRouter = require('./routes/index');
var hrRouter = require('./routes/hr');
var staffRouter = require('./routes/staff');
var hodRouter = require('./routes/hod');

// DataBase Setup
var db = config.cloud // change location of database
var app = express();

// mongodb connector 
mongoose.connect(db, {
  useNewUrlParser: true,useUnifiedTopology:true
},(error)=>{
  if(error){console.log(error.message)}else{
    console.log(chalk.green("database connected Successfully"));
  }
});


var store = new MongoDBStore({
  uri: db,
  collection: 'mySessions'
},
function(error) {
  if(error){
    console.log(error);
  }
});


// User session
store.on('error', function(error) {
  console.log("Error occurs no storage of session on db");
});

app.use(session({
  secret: "ilovecoding",//process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: store, // uncomment this for mongo storage
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
  }
}));



// Run To Create HR if exist
require('./config/createSuperUser')

//passport

app.use(passport.initialize());
app.use(passport.session());
  
app.use((req, res, next) => {
  res.locals.logUser = req.user;  
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/hr', hrRouter);
app.use('/staff', staffRouter);
app.use('/hod', hodRouter);

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

// const {data} = require('./util/data')
// setTimeout( ()=>{

//   console.log( data());
// }, 6000)

module.exports = app;
