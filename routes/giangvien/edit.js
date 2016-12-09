var express = require('express');
var User= require('../users');
var orm = require('orm');

module.exports = function (app) {
    app.post('/users/giangvien/edit',function (req, res) {
        var CN = req.body.chuyennganh;
        var email = req.body.email;
        var password = req.body.password;
        var sdt      = req.body.sodt;

        console.log(User.id);
        console.log(CN);
        orm.connect('mysql://root@localhost/mydb',function (err, db) {
            if (err) throw err;
            db.load('../../models/giangvien');
            var gv = db.models.giangvien;

            gv.get(User.id,function (err, person) {
                person.soDienThoai= sdt;
                person.matKhau   = password;
                person.chuyenNganh= CN;
                person.save(function (err) {
                    console.log('saved!');
                })
            });
            db.load('../../models/user');
            var user = db.models.user;

            user.get(User.id,function (err, person) {
                person.matKhau = password;
                person.vnuMail = email;
                person.save(function (err) {
                    console.log('saved user!');
                })
            })

        })
    });


}