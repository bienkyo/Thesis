var express = require('express');
var db = require('mysql');
var con = db.createConnection({
    host: 'localhost',
    user: 'root',
    password:'yahoo24',
    database:'mydb'
});

//CHECK CONNECTION

con.connect(function (err) {
    if (err) {
        console.log('error');
    } else{
        console.log('connect database succsess');
    }
});

module.exports = con;
