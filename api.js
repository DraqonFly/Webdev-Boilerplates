const cors = require('cors');
const bodyParser = require('body-parser')
const logger = require('morgan');
const path = require('path');
const express = require('express');
const api = express();
const port = 5000;

const indexRouter = require('./routes/index');
const db_statusRouter = require('./routes/mongoDB_status');

path.resolve(__dirname, ".../public/html");


api.use(cors());
api.use(logger('dev'))

// join /html and /json path to equal root path
api.use(express.static(path.join(__dirname, '/public/html')));

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.use('/mongoDB_status', db_statusRouter);
api.use('/', indexRouter);

api.listen(port,  () => console.log("Express API running on http://localhost:"+port+"/"))