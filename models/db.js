var express = require('express');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('mydb','root','',{
    host :'localhost',
    dialect : 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})