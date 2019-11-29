"use strict";

const router = require('./routers/example.router');
const app = require('./init.app');

// Routers
app.use('/', router);

module.exports = app;
