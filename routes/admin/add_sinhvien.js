var express= require('express');
var orm     = require('orm');
var con     = require('../../utils/sqlhelper');

module.exports = function (app) {
    app.post('/users/add_one_sinvien',function (req, res) {
        var msv = req.body.mssv;
        var tensv = req.body.tensv;
        var mail  = req.body.mailsv;
        var nganh = req.body.nganhsv;
        var khoahoc = req.body.khoahoc;
        var password= req.body.passwordsv;

        var post ={
            id: msv,
            tenNguoiDung: tensv,
            matKhau:password,
            vnuMail: mail
        };
        var post1 ={
            MSSV: msv,
            tenNguoiHoc: tensv,
            nghanhHoc_khNganh: nganh,
            khoaHoc_khKhoaHoc: khoahoc,
            vnuMail: mail,
            matKhau     :password,
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
                        console.log('insert one nguoi hoc thanh cong');
                        con.query('INSERT INTO nguoihoc SET ?',post1,function (err, result) {
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