const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const ApiError = require('./utils/ApiError');
const helmet = require('helmet');
const v1Routes = require('./routes/v1')
const captureDateMiddleware = require('./middlewares/middelware');

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(captureDateMiddleware)
app.use(helmet());

app.options("*", cors());

app.use("/v1", v1Routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

module.exports = app;