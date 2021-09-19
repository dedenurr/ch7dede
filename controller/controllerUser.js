var UserGameBiodata = require('../models/modelUserGameBiodata');
var UserGame = require('../models/modelUserGame');
var UserGameHistory = require('../models/modelUserGameHistory');

//parsing data dan simpan data ke collection userGameBiodata
exports.create = async (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: 'data tidak boleh kosong!!' });
    return;
  }

  // pay load  user game biodata in the database
  const userGameBiodata = new UserGameBiodata({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user game biodata in the database
  const saveUserGameBiodata = await userGameBiodata.save();

  // pay load  user game history in the database
  const userGameHistory = new UserGameHistory({
    gamehistory: req.body.gamehistory,
    statuswin: req.body.statuswin,
  });

  //save user game history in the database
  const saveUserGameHistory = await userGameHistory.save();

  // pay load  user game  in the database
  const userGame = new UserGame({
    username: req.body.username,
    password: req.body.password,
    usergamebiodataid: saveUserGameBiodata._id,
    usergamehistoryid: saveUserGameHistory._id,
  });

  //save user game  in the database
  await userGame
    .save()
    .then((data) => {
      //res.send(data);
      res.redirect('/addUser');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'ada kesalahan saat menyimpan data user',
      });
    });
};

//mencari dan menampilkan userGameBiodata
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    UserGameBiodata.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `user dengan id ${id} tidak ditemukan ` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: ` ada kesalahan saat mengambil id ${id}`,
        });
      });
  } else {
    UserGameBiodata.find()
      .then((userGameBiodata) => {
        res.send(userGameBiodata);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message || 'ada kesalahan ketika mengambil dan menampilkan data' });
      });
  }
};

//update userGameBiodata berdasarkan id
// exports.update = async (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({ message: 'data yang akan di update tidak boleh kososng' });
//   }
//   const id = req.params.id;
//   const payLoadUserGame = {
//     username: req.body.username,
//     password: req.body.password,
//   };

//   const findDataUserGame = await UserGame.findByIdAndUpdate(id, payLoadUserGame, { useFindAndModify: false });

//   const payLoadUserGameHistory = {
//     gamehistory: req.body.gamehistory,
//     statuswin: req.body.statuswin,
//   };

//   await UserGameHistory.findByIdAndUpdate(findDataUserGame.usergamehistoryid, payLoadUserGameHistory, { useFindAndModify: false });

//   const payLoadUserGameBiodata = {
//     name: req.body.name,
//     email: req.body.email,
//     gender: req.body.gender,
//     status: req.body.status,
//   };
//   console.log(payLoadUserGameBiodata);
//   await UserGameBiodata.findByIdAndUpdate(findDataUserGame.usergamebiodataid, payLoadUserGameBiodata, { useFindAndModify: false })
//     .then((findDataUserGame) => {
//       if (!findDataUserGame) {
//         res.status(404).send({ message: `tidak bisa mengupdate data ${id}. data id ini tidak ditemukan` });
//       } else {
//         res.send(findDataUserGame);
//       }
//     })
//     .catch(() => {
//       res.status(500).send({ message: 'error Update user Information' });
//     });
// };

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'data yang akan di update tidak boleh kososng' });
  }
  const id = req.params.id;
  UserGameBiodata.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `tidak bisa mengupdate data ${id}. data id ini tidak ditemukan` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'error Update user Information' });
    });
};

//delete userGameBiodata berdasarkan id
// exports.delete = async (req, res) => {
//   const id = req.params.id;

//   const find = await UserGame.findById(id);

//   await UserGameBiodata.findByIdAndDelete(find.usergamebiodataid);
//   await UserGameHistory.findByIdAndDelete(find.usergamehistoryid);
//   await UserGame.findByIdAndDelete(id)

//     .then((find) => {
//       if (!find) {
//         res.status(404).send({ message: `tidak bisa menghapus id ${id} id tidak ditemukan` });
//       } else {
//         res.send({
//           message: `user berhasil dihapus`,
//         });
//       }
//     })
//     .catch(() => {
//       res.status(500).send({
//         message: `tidak bisa menghapus user dengan id ${id}`,
//       });
//     });
// };

exports.delete = (req, res) => {
  const id = req.params.id;

  UserGameBiodata.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `tidak bisa menghapus id ${id} id tidak ditemukan` });
      } else {
        res.send({
          message: `user berhasil dihapus`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `tidak bisa menghapus user dengan id ${id}`,
      });
    });
};

//aggregate usergame usergamebiodata usergamehistory

exports.aggregate = (req, res) => {
  UserGame.aggregate([
    {
      $lookup: {
        from: 'user_game_history',
        localField: 'usergamehistoryid',
        foreignField: '_id',
        as: 'historyUser',
      },
    },
    {
      $lookup: {
        from: 'user_game_biodata',
        localField: 'usergamebiodataid',
        foreignField: '_id',
        as: 'biodataUser',
      },
    },
  ])
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
