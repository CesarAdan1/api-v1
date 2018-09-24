const { Router } = require('express');

const app = Router();

//Controllers

const ProfileUser = require('../controllers/ProfileUser');
const User = require('../controllers/User');

const isAuthenticated = require('../services/Auth');

//Endpoints

app.get('/profileuser/:profileuserId', ProfileUser.getById);

app.route('/profileusers')
    .get(ProfileUser.index)
    .post(isAuthenticated, ProfileUser.create)
    .put(ProfileUser.update)
    .delete(ProfileUser.remove);

app.get('/profileuser/:profileuserId', ProfileUser.getById);

app.post('/auth/signup', User.create);
app.get('/auth/login', User.login)
app.get('/users', User.index);

module.exports = app;
