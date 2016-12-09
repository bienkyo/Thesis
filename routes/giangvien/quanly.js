var express = require('express');
var User= require('../users');
var orm = require('orm');
var conn= require('../../utils/sqlhelper');
module.exports = function (app) {
    app.get('/users/giangvien/profile',function (req, res) {
         orm.connect('mysql://root@localhost/mydb',function (err, db) {
             if (err) throw err;

             console.log(User.id);
             db.load('../../models/giangvien');
             var gv = db.models.giangvien;

             gv.find({ID:User.id},function (err,person) {
                 if (err) throw err;

                 console.log(person[0].matKhau);
                 db.load('../../models/user');
                 var user = db.models.user;
                 user.find({id:User.id},function (err,per) {
                     if (err) throw err;

                      res.render('giangvien/giangvien',{
                         "row": person[0],
                          "username":per[0].tenNguoiDung,
                          "password":per[0].matKhau,
                          "vnumail":per[0].vnuMail
                      })
                 })
             })
         })
        // console.log(User.id);
        // conn.query('SELECT * FROM user WHERE id=?',User.id,function (err, rows) {
        //     if (err) throw err;
        //     console.log(rows[0]);
        //
        // })
    })
}