const axios = require('axios');

//render setiap halaman yang telah dibuat

exports.dashboardRoutes = (req, res) => {
  //mendapatkan request ke /api/users
  axios
    .get('http://localhost:5000/api/users')
    .then(function (response) {
      res.render('./superadmin/dashboard', { userGameBiodata: response.data }); //sumber halaman
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.addUsersRoutes = (req, res) => {
  res.render('./superadmin/addUser');
};

exports.update_user = (req, res) => {
  axios
    .get('http://localhost:5000/api/users/', { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render('./superadmin/updateUser', { users: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.mainRoutes = (req, res) => {
  res.render('main');
};

exports.loginRoutes = (req, res) => {
  res.render('login');
};

exports.gameRoutes = (req, res) => {
  res.render('game');
};
