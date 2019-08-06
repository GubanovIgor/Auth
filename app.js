const express = require('express');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const path = require('path');
const logger = require('morgan');
const handlebars = require('express-handlebars');
const session = require('express-session');

const hbs = handlebars.create({
  defaultLayout: 'layout',
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views'),
});

mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser: true})

const app = express();

app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`Запущен порт ${port}`);
})

module.exports = app;
