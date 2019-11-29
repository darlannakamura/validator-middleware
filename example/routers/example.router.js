'use strict';
const express = require('express');
const router = express.Router();

const controller = require('../controllers/example.controller');
const validator = require('../validators/example.validator');

router.get('', controller.helloWorld);
router.post('', validator.middleware, controller.add);

module.exports = router;