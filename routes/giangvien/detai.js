var express = require('express');
var con     = require('../../utils/sqlhelper');
var User= require('../users');

module.exports = function (app) {
    app.post('/users/giangvien/chapnhandetai',function (req, res) {
        con.query('UPDATE detai SET nopQuyenChua=? WHERE ID="'+req.body.mdt+'"',1,function (err, result) {
            if (err) throw err;
            console.log('sinh vien duoc chap nhan');
        })
    })

    app.post('/users/giangvien/huybodetai',function (req, res) {
        con.query('UPDATE detai SET nopQuyenChua=? WHERE ID="'+req.body.mdt+'"',0,function (err, result) {
            if (err) throw err;
            console.log('sinh vien khong duoc chap nhan');
        })
    })
}