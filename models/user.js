 module.exports = function (db, cb) {
     db.define("user",{
         id           : Number,
         tenNguoiDung : String,
         matKhau      : String,
         vnuMail      : String,
         quyen        : String,
         kichHoat     : Number
     },{
         methods : {
             infomation : function () {
                 return this.tenNguoiDung +' mk:' + this.matKhau;
             },
             validPassword: function (password) {
                 return this.matKhau == password;
             }
         }
     });
     return cb();
 };


// var express = require('express');
// var Sequelize = require('sequelize');
//
// var sequelize = new Sequelize('mydb','root','',{
//     host :'localhost',
//     dialect : 'mysql',
// });
// sequelize.sync();
// var User = sequelize.define('user',{
//
//     tenNguoiDung:{
//         type: Sequelize.STRING
//     },
//     matKhau:{
//         type: Sequelize.STRING
//     },
//     vnuMail:{
//         type: Sequelize.STRING
//     },
//     kichHoat:{
//         type: Sequelize.NUMBER
//     },
//
// });

// module.exports = sequelize;


