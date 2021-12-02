// const e = require("express");
const db = require("../../models");
const {
  hash: hashPassword,
  compare: comparePassword,
} = require("../../utils/password");
const sendEmail = require("../../../helpers/send-email");
const User = db.user;
const Support = db.support;
const Venue = db.venue;
const Checkin = db.checkin;


var allUsers = (req, res) => {
  User.findAll({
  })
    .then((data) => {
      res.status(200).send({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.status(200).send({
        status: false,
        error,
      });
    });
};

var resetUserPassword = async (req, res) => {
  const { password } = req.body;
  User.findOne({ where: { id: req.body.userId } })
    .then((user) => {
      if (user) {
        const hashedPassword = hashPassword(password.trim());
        user
          .update({
            password: hashedPassword,
          })
          .then((updatedUser) => {
            updatedUser.password = undefined;
            res.status(200).send({
              status: true,
              message: "Password updated successfully!",
            });
          })
          .catch((error) => res.status(200).send({ status: false, error }));
      }
    })
    .catch((error) => res.status(200).send({ status: false, error }));
};

var supportMessages = (req, res) => {
  Support.findAll()
    .then((data) => {
      res.status(200).send({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.status(200).send({
        message: "There may be now support messages",
        status: false,
        error,
      });
    });
};


var allCheckins = (req, res) => {
  Checkin.findAll({
    include: [
      Venue, User
    ]
  }).then((data) => {
    res.status(200).send({
      status: true,
      data
    })
  }).catch(error => res.status(500).send({ status: false, error }));
}





module.exports = {

  allUsers,
  supportMessages,
  resetUserPassword,
  allCheckins
};
