const { Router } = require('express');
const app = Router();
const Users = require('../controllers/Users');
const Google = require('../controllers/Google');
const isAuthenticated = require('../services/Auth');
const Data = require('../controllers/Data');
// USERS
app.post('/auth/signup', Users.create);
app.post('/auth/login', Users.login);
app.get('/users', Users.index);
app.get('/users/:userId', Users.getById);
app.delete('/users/:userId', Users.remove);



app.get('/data', Data.index);
app.post('/data/dataId', Data.create);

 app.get('/googledata', Google.index);
 app.post('/googledata/googleId', Google.create);

module.exports = app;
