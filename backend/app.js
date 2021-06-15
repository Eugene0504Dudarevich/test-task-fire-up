const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const index = require('./routes/index');
const categories = require('./routes/categories');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/', index);
app.use('/', categories);

app.use(function(request, response, next) {
  next(createError(404));
});

// Error handler
app.use(function(error, request, response) {
  // Set locals, only providing error in development
  response.locals.message = error.message;
  console.log('errorMessage', error.message);
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // Render the error page
  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
