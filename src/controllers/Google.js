const ODM= require('mongoose');

const Google = require('../models/Google');

const Controller = {
    index: (request, response) => {
       Google
        .find({})
        .exec()
        .then(googledata => {
            response
                .status(200)
                .json({
                    googledata,
                    total: googledata.length
                });
        }) 
        .catch(error => {
            response
                .status(500)
                .json({
                    error
                });
        });
    },
    create: (request, response) => {
        Google
            .find({
                placelocation: request.body.placelocation,
                nameplace: request.body.nameplace,
                telefono: request.body.telefono
            })
            .exec()
            .then(googledata => {
                if(googledata.length < 1){
                const newData = new Google({
                    _id: ODM.Types.ObjectId(),
                    
                    placelocation: request.body.placelocation,
                    nameplace: request.body.nameplace, 
                    telefono: request.body.telefono                  

                });

                newData
                    .save()
                    .then(saved => {
                        response
                            .status(201)
                            .json({
                                message:"You completed your profile, start helping now"
                            });
                    })
                    .catch(error => {
                        response
                            .status(500)
                            .json({
                                error
                            })
                    });
                 } else {
                    response
                        .status(422)
                        .json({
                            message: "Other people have registered this data"
                        });
                    }
                })
                .catch(error => console.log(error));
                 },
                 remove: (request, response) => {
                    Google
                      .findByIdAndRemove(request.params.googledataId)
                      .exec()
                      .then(() => {
                        response
                          .status(200)
                          .json({
                            message: 'User was deleted.'
                          });
                      });
                  },
                  getById: (req, res) => {
                  Google
                      .findById(req.params.googledataId)
                      .exec()
                      .then(user => {
                        response
                          .status(200)
                          .json({
                            user
                          });
                      })
                      .catch(error => {
                        response
                          .status(500)
                          .json({
                            error
                          });
                      });
                  },
                 

    }

module.exports = Controller;