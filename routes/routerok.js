const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const controller = require('../controller/controllerUser');
const axios = require('axios');

//Router page
router.get('/', (req, res) => res.render('main')); //ini diambil/dirender dari nama file main.ejs yang ada di folder views
router.get('/game', (req, res) => res.render('game')); //ini diambil/dirender dari nama file game.ejs yang ada di folder views
//router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('superadmin/dashboard', { name: req.user.name })); //ini diambil/dirender dari nama file dashboard.ejs yang ada di folder views
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  axios
    .get('http://localhost:5050/api/users')
    .then(function (response) {
      res.render('./superadmin/dashboard', { userGameBiodata: response.data }); //sumber halaman
    })
    .catch((err) => {
      res.send(err);
    });
}); //ini diambil/dirender dari nama file dashboard.ejs yang ada di folder views
router.get('/addUser', ensureAuthenticated, (req, res) => res.render('./superadmin/addUser'));
router.get('/update-user', (req, res) => {
  axios
    .get('http://localhost:5050/api/users/', { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render('./superadmin/updateUser', { users: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
}); // @description "update user", @method GET "/updateUser"

//Router API
router.post('/api/users', controller.create);
router.get('/api/users', controller.find);
router.put('/api/users/:id', controller.update);
router.delete('/api/users/:id', controller.delete);

module.exports = router;
