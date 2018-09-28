const mongoose = require('mongoose');

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
                nameplace: request.body.email
            })
            .exec()
            .then(googledata => {
                if(googledata.length < 1){
                const newData = new Data({
                    _id: mongoose.Types.ObjectId(),
                    imageplace: request.body.imageplace,
                    placelocation: request.body.placelocation,
                    nameplace: request.body.nameplace,
                    map: request.body.map,

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
                //  remove: (request, response) => {
                //      Google
                //         .findByIdAndRemove(request.params.userId)
                //         .exec()
                //         .then(() =>{
                //             response
                //                 .status(200)
                //                 .json({
                //                     message: "Data was deleted"
                //                 })
                //         });
                //  }

    }

module.exports = Controller;