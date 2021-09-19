const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

//passport config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

app.use(morgan('tiny'));

// connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongodb COnnected'))
  .catch((err) => console.log(err));

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//load public
app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));
app.use('/css', express.static(path.resolve(__dirname, 'public/css')));
app.use('/js', express.static(path.resolve(__dirname, 'public/js')));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//routes
app.use('/', require('./routes/routerok'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5050;

app.listen(PORT, console.log(`Server is Running in Port http://localhost:${PORT}`));
