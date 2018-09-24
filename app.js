require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const ODM = require('mongoose');

//all the routes
const api = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:3001${ process.env.MONGODB_DATABASE }`;

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

//view configuration
app.set('view', '.src/view');
app.set('view engine', 'pug');
app.set('json spaces', 2);

//logs all requests

app.use(logger('dev'));
app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

api.get('/', (request, response) => {
    response.render('main', {
        title: 'Final Project Rest API',
        subtitle: 'Docs',
    });
});

app.use((request, response, next) =>{
    response.header('Access-Control-allow-Origin', '*');
    response.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization '
    );
    next();
});

//Enable OPTIONS

app.options('*', (request, response, next) => {
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
})

//ENDPOINTS a la API
app.use('/api/v1', api);
  
app.use((request, response, next)=>{
    const ERROR_404 = {
        error: {
            message: 'The requested resource is not defined',
            status: 404,
        }
    };
    next(ERROR_404);
});

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
          status: STATUS_CODE,
        }
      });
  
    console.log(formatedMessage);
  });
  
  /**
   * [10] Run and listen the server on an specific port.
   */
  app.listen(PORT, () => {
    const formatedMessage = `Express server running on PORT: ${ PORT }`;
  
    console.log(formatedMessage);
  });

