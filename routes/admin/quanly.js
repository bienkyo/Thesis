var express = require('express');
var orm     = require('orm');
var User= require('../users');
var con= require('../../utils/sqlhelper');

module.exports = function (app) {
    app.get('/users/admin/quanly',function (req, res) {
        res.render('admin/quanly');
    });

    app.get('/users/admin/profile',function (req, res) {
        console.log(User.id);
        con.query('SELECT * FROM user WHERE id=?',User.id,function (err, result) {
            if (err){
                console.log('khong tim thay');
            } else {
                res.render('admin/admin',{
                    "row": result[0]
                })
            }
        })
    })
}