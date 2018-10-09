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
app.get('/data/:dataId', Data.getById);
app.post('/data', Data.create);
app.delete('/data/:dataId', Data.remove)

app.get('/googledata', Google.index);
app.get('/googledata/:googledataId', Google.getById);
app.post('/googledata', Google.create);
app.delete('/googledata/:googledataId', Google.remove)

module.exports = app;
