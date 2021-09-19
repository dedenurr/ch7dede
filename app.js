//import module
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

//module express active
const app = express();

//initiation port to dotenv
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));

connectDB();

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use view engine ejs
app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, 'views/ejs'));

//load public
app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));
app.use('/css', express.static(path.resolve(__dirname, 'public/css')));
app.use('/js', express.static(path.resolve(__dirname, 'public/js')));

//built in middleware
app.use(express.static('public'));

app.use(express.json());

//run server
app.listen(PORT, (req, res) => {
  console.log(`Berhasil terhubung ke server http://localhost:${PORT}`);
});

//data user static
const userData = {
  username: 'dede',
  password: '292929',
  hobby: 'futsal',
  address: 'Karawang',
};

//Internal Server Error Handler
app.use((err, req, res, next) => {
  console.log('Ada error');
  console.log(typeof err);
  if (err) {
    console.log(err);
  }
  res.status(500).json({
    status: 'error',
    error: err,
  });
  next();
});

app.post('/dashboard', (req, res) => {
  const loginReq = req.body;
  if (loginReq.username !== userData.username) {
    res.status(400).send({
      message: 'succes delete data',
    });
  } else if (loginReq.password !== userData.password) {
    res.status(400).send({ message: 'Password is incorrect' });
  }
  res.status(200).send({
    message: 'Login Successful',
    data: userData,
  });
});

//Load routers
app.use('/', require('./server/routes/router'));

//404 handler
app.use((req, res, next) => {
  res.status(404).render('./404.ejs');
  next();
});
