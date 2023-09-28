'use strict';
var express = require('express');
var router = express.Router();

var { MinMaxAntSystem } = require('../public/javascripts/min-max-ant-solution');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
