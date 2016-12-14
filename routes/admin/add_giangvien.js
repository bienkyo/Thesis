var express= require('express');
var orm     = require('orm');
var con     = require('../../utils/sqlhelper');

module.exports = function (app) {
    app.post('/users/add_one_giangvien',function (req, res) {
        var CN = req.body.chuyennganh;
        var email = req.body.email;
        var password= req.body.password;
        var khoa    = req.body.khoa;
        var ID      = req.body.ID;
        var username= req.body.username;
        var sdt     = req.body.sodt;
        var bomon   = req.body.bomon;
        var post ={
            id: ID,
            tenNguoiDung: username,
            matKhau:password,
            vnuMail: email,
            quyen:'giang_vien'
        };
        var post1 ={
            ID: ID,
            matKhau: password,
            soDienThoai: sdt,
            khoa_khKhoa: khoa,
            chuyenNganh: CN,
            hocHam     :'ThS.',
            khBomon   : bomon
        }
        console.log(post1);
        orm.connect('mysql://root@localhost/mydb',function (err, db) {
            if (err) throw err;

            db.load('../../models/user',function (err) {
                if (err) throw err;
                var User = db.models.user;
                User.create(post,function (err, result) {
                    if (err){
                        console.log('insert one giangvien error');
                    } else {
                        console.log('insert one giang vien thanh cong');
                        con.query('INSERT INTO giangvien SET ?',post1,function (err, result) {
                            if (err) throw err;
                            console.log('ok');
                        })
                    }
                });


                // db.load('../../models/giangvien',function (err) {
                //     if (err) throw err;
                //     var Giang_Vien = db.models.giangvien;
                //     Giang_Vien.create(post1,function (err) {
                //         if (err){
                //             console.log('fail');
                //         } else {
                //             console.log('ok');
                //         }
                //     })
                // })
            })
        })
    })
}