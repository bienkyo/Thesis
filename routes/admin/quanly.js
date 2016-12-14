var express = require('express');
var orm     = require('orm');
var User= require('../users');
var con= require('../../utils/sqlhelper');
var mailer = require('../../utils/mail-chuanophosobaove');
var user = require('../../utils/user-roles');
module.exports = function (app) {


    app.get('/users/admin/quanly',user.is('admin'),function (req, res) {
        con.query('SELECT * FROM detai WHERE nopQuyenChua=1 AND nopHoSoChua=1',function (err, result) {
            if (err) throw err;
            console.log(result);
            con.query('SELECT * FROM detai WHERE duocBaoVeKhong=1',function (err, ds) {
                res.render('admin/quanly',{
                    "Detai": result,
                    "ds": ds
                });
            })
        });

        con.query('SELECT * FROM detai WHERE nopQuyenChua=1',function (err, result) {
            if (err) throw err;

            for (var i=0;i<result.length;i++)
            {
                if (result[i].nopHoSoChua!=1){
                    con.query('SELECT * FROM nguoihoc WHERE MSSV=?',result[i].nguoiHoc_MSSV,function (err, kq) {
                        if (err) throw err;

                        mailer.mailTo(kq[0],function (err, info) {
                            if(err) throw err;

                            console.log('Message sent:'+info.response);
                        })
                    })

                }
            }
        });

    })

    app.get('/users/admin/profile',function (req, res) {
        console.log(User.id);
        con.query('SELECT * FROM user WHERE id=?',User.id,function (err, result) {
            if (err){
                console.log('khong tim thay');
            } else {
                    res.render('admin/admin',{
                        "row":result[0]
                    })
            }
        })
    })
}