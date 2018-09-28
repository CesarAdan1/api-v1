const mongoose = require('mongoose');

const Data = require('../models/Data');

const Controller = {
    index: (request, response) => {
        Data
            -find({})
            .exec()
            .then(data => {
                response   
                    .status(200)
                    .json({
                        data,
                        total: data.length
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
        Data
            .find({
                
            })
            .exec()
            .then(dataobtained => {
                if(dataobtained.length < 1) {
                    
                    const newData = new Data({
                        _id: mongoose.Types.ObjectId(),
                        imagedish: request.body.imagedish,
                        typefood: request.body.typefood,
                        lastprice: request.body.lastprice,
                        actualprices: request.body.actualprice,
                        save: request.body.save,
                        initdate: request.body.initdate,
                        enddate: request.body.enddate,
                        inithour: request.body.inithour,
                        endhour: request.body.endhour,
                    });
                    newData
                        .save()
                        ,then(saved => {
                            response
                                .status(201)
                                .json({
                                    message: 'You posted successfully'
                                });
                        })
                        .catch(error =>{
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
                            message: 'You previously registered this offer.'
                        });
                }
            })
            .catch(errorr => console.log(error));
    },
    remove: (request, response) => {
        Data
          .findByIdAndRemove(request.params.userId)
          .exec()
          .then(() => {
            response
              .status(200)
              .json({
                message: 'User was deleted.'
              });
          });
      },
      update: (request, response) => {
        Data
          .updateOne(request.params.userId)
          .exec()
          .then(() => {
            response
              .status(200)
              .json({
                message: 'You update fields'
              });
          });
      },
}

module.exports = Controller;