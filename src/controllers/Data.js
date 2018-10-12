const ODM = require('mongoose');
const Data = require('../models/Data');

const Controller = {
    index: (request, response) => {
        Data
            .find({})
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
                        kind: request.body.kind,
                        food: request.body.food,
                        lastprice: request.body.lastprice,
                        actualprice: request.body.actualprice,
                        saving: request.body.saving,
                        availability: request.body.availability

                
              })
            .exec()
            .then(data => {
                if(data.length < 1) {
                    
                    const newData = new Data({
                        _id: ODM.Types.ObjectId(),
                        
                        kind: request.body.kind,
                        food: request.body.food,
                        lastprice: request.body.lastprice,
                        actualprice: request.body.actualprice,
                        saving: request.body.saving,
                        availability: request.body.availability
                    });
                    newData
                        .save()
                        .then(saved => {
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
          .findByIdAndRemove(request.params.dataId)
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
       Data
          .findById(req.params.dataId)
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