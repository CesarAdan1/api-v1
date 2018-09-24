const ODM = require('mongoose');
const ProfileUser = require('../models/ProfileUser')

const Controller = {
   
        index: (request, response) => {
            ProfileUser
                .find()
                .exec()
                .then(profileusers =>{
                    response    
                        .json({
                            profileusers
                        })
                        .status(200);
                })
                .catch(error => console.log(error));
            },
            
            getById: (request, response) => {

                const { profileusersId } = request.params;
                const profileusers = profileusers.data.filter(profileusers => profileuser.id === parseInt(profileusersId) );
                
                response
                    .json({
                        data: profileuser
                    })
                    .status(200);
            },
            create: (request, response) => {
                const newProfileuser = new ProfileUser({
                    _id: new ODM.Types.ObjectId(),
                    name: request.body.name,
                });

                newProfileuser 
                    .save()
                    .then(newRecord => {
                        response
                            .json({
                                type: 'POST Request',
                                data: newRecord
                            })
                            .status(201);
                    })
                    .catch(error => console.log(error));
            },
            update: (request, response) => {
                response
                    .json({
                        type: 'PUT Request'
                    })
                    .status(200);
            },
            remove: (request, response) => {
                response
                    .json({
                        type: 'DELETE Request'
                    })
                    .status(200);
            }
        };

module.exports = Controller;