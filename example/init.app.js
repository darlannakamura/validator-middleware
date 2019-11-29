const express = require('express');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(helmet());

//This is needed because the preflight request, cause we use Content-Type: 'application/json' and methods like PATCH.
//See https://dev.to/effingkay/cors-preflighted-requests--options-method-3024 to a clarify explanation about preflight responses.
app.options('*', cors()); 

// application/json type post data
app.use(bodyParser.json({
    limit: '5mb'
}));

// disable application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: false
}));

// Enable CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

module.exports = app;