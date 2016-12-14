var express = require('express');
var router = express.Router();
var con = require('../utils/sqlhelper')
router.get('/search', function (req,res) {
    ORMConnector(function (err, db) {
        if (err) throw err;
    })
});