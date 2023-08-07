const { MONGODB_URI } = require('./utils/config');
const { info, error } = require('./utils/logger');
const express = require('express');
require('express-async-errors');
const app = express();
//const cors = require('cors');
const router = require('./controllers/blogs');
const userRouter = require('./controllers/users')
const { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware')
const mongo = require('mongoose');
const loginRouter = require('./controllers/login')


mongo.connect(MONGODB_URI, info("Connecting to Mongo..."))
    .then(info("Conection to Mongo successfully established!"))
    .catch(error => error(error.message));

//app.use(cors);

app.use(express.json());

app.use(requestLogger);

app.use(tokenExtractor)

app.use('/api/login', loginRouter)

app.use('/api/users', userRouter)

app.use('/api/blogs', router);

app.use(unknownEndpoint);

app.use(errorHandler);

module.exports = app;


