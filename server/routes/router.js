const express = require('express'); //import express
const route = express.Router(); //inisiasi express route

const services = require('../services/render'); //import dari file render.js  yang berada di folder services
const controller = require('../controller/controllerUser');

//route page
route.get('/', services.mainRoutes); // @description "root route", @method GET "/"
route.get('/game', services.gameRoutes); // @description "game", @method GET "/game"
route.get('/login', services.loginRoutes); // @description "login", @method GET "/login"
route.get('/dashboard', services.dashboardRoutes); // @description "dashboard", @method GET "/dashboard"
route.get('/addUser', services.addUsersRoutes); // @description "add user", @method GET "/addUser"
route.get('/update-user', services.update_user); // @description "update user", @method GET "/updateUser"

//API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
route.get('/api/users/aggregate', controller.aggregate); // @description "update user", @method GET "/updateUser"

module.exports = route; //export "route" yang telah dibuat agar bisa digunakan di file lain (app.js)
