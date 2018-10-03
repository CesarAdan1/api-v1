const ODM = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const Controller = {
  index: (req, res) => {
    Users
      .find({})
      .exec()
      .then(users => {
        res
          .status(200)
          .json({
            users,
            total: users.length
          });
      })
      .catch(error => {
        res
          .status(500)
          .json({
            error
          });
      });
  },
  create: (req, res) => {
    Users
      .find({
        email: req.body.email,
        username: req.body.username
      })
      .exec()
      .then(users => {
        if (users.length < 1) {
          const hash = bcrypt.hashSync(req.body.password);

          const newUser = new Users({
            _id: ODM.Types.ObjectId(),
            email: req.body.email,
            password: hash,
           
          });

          newUser
            .save()
            .then(saved => {
              res
                .status(201)
                .json({
                  message: 'User created successfully.'
                });
            })
            .catch(error => {
              res
                .status(500)
                .json({
                  error
                })
            });
        } else {
          res
            .status(422)
            .json({
              message: 'User already exists.'
            });
        }
      })
      .catch(error => console.log(error));
  },
  remove: (req, res) => {
    Users
      .findByIdAndRemove(req.params.userId)
      .exec()
      .then(() => {
        res
          .status(200)
          .json({
            message: 'User was deleted.'
          });
      });
  },

  login: (req, res) => {
    Users
      .find({
        email: req.body.email
      })
      .exec()
      .then(user => {
        if (user.length > 0) {

          bcrypt.compare(req.body.password, user[0].password, (error, result) => {
            if (error) {
              return res
                .status(401)
                .json({
                  message: 'Authentication failed.'
                })
            }

            if (result) {
              const token = jwt.sign({
                email: user[0].email,
                userId:  user[0]._id
              }, process.env.JWT_SECRETKEY, {
                expiresIn: '1h'
              });

              return res
                .status(200)
                .json({
                  message: 'Authentication successfull.',
                  token,
                  user
                });
            }

            res
              .status(401)
              .json({
                message: 'Authentication failed.'
              })
          });
        } else {
          res
            .status(422)
            .json({
              message: 'Authentication failed.'
            })
        }
      });
  },
  getById: (req, res) => {
    Users
      .findById(req.params.userId)
      .exec()
      .then(user => {
        res
          .status(200
)          .json({
            user
          });
      })
      .catch(error => {
        res
          .status(500)
          .json({
            error
          });
      });
  },
};

module.exports = Controller;

