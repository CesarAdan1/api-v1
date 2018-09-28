const { Router } = require('express');
const app = Router();
const User = require('../controllers/User');
// const Data = require('../controllers/Data');
// const Google = require('../controllers/Google');

// app.route('/data')
//     .get(Data.index)
//     .post(Data.create)

// app.route('/google')
//     .get(Google.index)
//     .post(Google.create)

app.get('/users', User.index);
app.delete('/users/:userId', User.remove);
app.post('/auth/signup', User.create);
app.post('/auth/login', User.login);
// app.get('/data', Data.index);
// app.post('/data/:dataId', Data.post);

// app.get('/googledata', Google.index);
// app.post('/gosuogledata/:googleId', Google.create);




module.exports = app;
