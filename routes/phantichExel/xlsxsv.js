var express = require('express');
var mongoose= require('mongoose');
var orm     = require('orm');
var bodyParser = require('body-parser');
var con= require('../../utils/sqlhelper');
var mailer = require('../../utils/mail-registration');
module.exports = function (app) {
//INSERT XLSX BY MONGODB

// var dataModel = mongoose.model('data',{
//     Company: String,
//     Phone  : String,
//     Price  : String
// });



//TAKE XLSX

    if(typeof require !== 'undefined') XLSX = require('xlsx');
    var workbook = XLSX.readFile('./uploads/sinh_vien.xlsx');

    var first_sheet_name = workbook.SheetNames[0];
    var address_of_cell = 'A1';

    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];

    var sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y) { /* iterate through sheets */
        var worksheet = workbook.Sheets[y];

        // XLSX TO JSON
        var xxx= XLSX.utils.sheet_to_json(worksheet);
        console.log(xxx);


        // INSERT XLSX TO COLLECTION DATAS IN MYLOGINAPP MONGODB


        // dataModel.collection.insert(xxx, function(err,r) {
        //     if (err) {
        //     } else{
        //         console.log('insert sucsseccfull')
        //     }
        // })
        orm.connect('mysql://root@localhost/mydb',function (err, db) {
            if (err) throw err;
            db.load('../../models/user',function (err) {
                var User= db.models.user;
                for(var i=0;i<xxx.length;i++){
                    var post= xxx[i];

                    console.log(post);
                    var mk =post.matKhau = Math.random().toString(36).slice(-8);
                    User.create({id:post.id, tenNguoiDung:post.tenNguoiDung,matKhau:mk,vnuMail:post.vnuMail,
                        kichHoat:post.kichHoat,quyen:post.quyen},function (err,result) {
                        if (err){
                            console.log('insert database error');
                        }else {
                            console.log('insert user sv thanh cong '+post.vnuMail);
                        }

                    });

                    db.load('../../models/nguoihoc',function (err) {
                        var Sinh_Vien = db.models.nguoihoc;
                        Sinh_Vien.create({MSSV:post.id,matKhau:mk,tenNguoiHoc:post.tenNguoiDung,nghanhHoc_khNganh:post.nghanhHoc_khNganh,
                            khoaHoc_khKhoaHoc:post.khoaHoc_khKhoaHoc,vnuMail:post.vnuMail,duocDangKiKhoaLuanKhong:post.duocDangKiKhoaLuanKhong},function (err,kq) {
                            if(err){
                                console.log('insert sinh vien that bai');
                            } else {
                                console.log('Insert sinh vien Thanh cong ');
                            }
                        })
                    })
                    mailer.mailTo(post,function(error, info) {
                        if (error) {
                            return console.error(error);
                        }
                        console.log('Message sent: ' + info.response);
                    })
                }
            })
        })

    });
}
