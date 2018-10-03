require('dotenv').config();

const express = require('express');
const app = express();
const logger = require('morgan');
const chalk = require('chalk');
const log = console.log;
const api = require('./src/routes/api');
const ODM = require('mongoose');
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

//////////////////////////////////////////////////////////////////////////////

//MONGO_URI on mlab
//'mongodb://<dbuser>:<dbpassword>@ds133358.mlab.com:33358/hacked_restapi' ||

ODM.connect(MONGODB_URI, {
  useNewUrlParser: true
});

ODM.connection.on('connected', () => {
  const formatedMessage = {
    host: process.env.MONGODB_PROVIDER,
    success: true
  };

  console.log(JSON.stringify(formatedMessage, null, 2));
});


//middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/static',express.static('public'));
app.use(logger('dev'));
app.set('views', './src/views');
app.set('view engine', 'pug');
app.set('json spaces', 2);

app.get('/',(req, res) => {
	res.render('main');
});

app.use('/api/v1',api);


// [5] CORS
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});


// [6] OPTIONS
app.options('*', (request, response, next) => {
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  response.send(200);
  next();
});

 // [8] 404 Not Found
app.use((request, response, next) => {
  const ERROR_404 = {
    error: {
      message: 'The requested resource is not defined.',
      status: 404
    }
  };

  next(ERROR_404);
});

// [9] 500 Internal Error Server
app.use((error, request, response, next) => {
  const body = error.error;
  const STATUS_CODE = body.status || 500;
  const ERROR_505 = body.message || '500. Internal Server Error :(';

  const formatedMessage = JSON.stringify(error, null, 2);

  response
    .status(STATUS_CODE)
    .json({
      error: {
        message: ERROR_505,
        status: STATUS_CODE
      }
    });

  console.log(formatedMessage);
});


app.listen(PORT, (req, res) => {
	log(chalk.red(`express server is running in port:${ PORT }`));
});
