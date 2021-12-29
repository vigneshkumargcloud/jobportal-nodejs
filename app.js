var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var regRouter=require('./routes/register');
var jobcategRouter=require('./routes/jobcategory');
var careeier=require('./routes/careeieruser');
var jobtype=require('./routes/job_type');
var businessstream=require('./routes/businessstream');
var bucomp=require('./routes/businessandcomp');
var company=require('./routes/company');
var jobs=require('./routes/jobpost');
var savedjobs=require('./routes/favjobs');
var message=require('./routes/message');
var jobdes=require('./routes/jobdes');
var profile=require('./routes/profiles');
var jobstatus=require('./routes/jobstatus');
var appliedjobs=require('./routes/apply');

var educationdetails=require('./routes/educationdetails');
var wrke=require('./routes/workexp');
var skills=require('./routes/skills');
var replies=require('./routes/replies');
var app = express();
// var publicDir = require('path').join(__dirname,'public'); 
// app.use(express.static(publicDir)); 
app.use(express.static(path.join(__dirname,'public')));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, DELETE","PUT");
//   next();
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',regRouter);
app.use('/jobcategory',jobcategRouter);
app.use('/jobtype',jobtype);
app.use('/careeier',careeier);
app.use('/bst',businessstream);
app.use('/cmp',company);
app.use('/bucomp',bucomp);
app.use('/jobs',jobs);
app.use('/favjobs',savedjobs);
app.use('/msg',message);
app.use('/jobdesc',jobdes);
app.use('/profile',profile);
app.use('/appliedjobs',appliedjobs);
app.use('/educationdetails',educationdetails);
app.use('/wrke',wrke);
app.use('/skills',skills);
app.use('/replies',replies);
app.use('/jobstatus',jobstatus);

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

module.exports = app;
