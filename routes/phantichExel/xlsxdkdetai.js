var express = require('express');
var mongoose= require('mongoose');
var orm     = require('orm');
var bodyParser = require('body-parser');
var con= require('../../utils/sqlhelper');
var mailer = require('../../utils/mail-dkdetai');
module.exports = function (app) {
//INSERT XLSX BY MONGODB

// var dataModel = mongoose.model('data',{
//     Company: String,
//     Phone  : String,
//     Price  : String
// });



//TAKE XLSX

    if(typeof require !== 'undefined') XLSX = require('xlsx');
    var workbook = XLSX.readFile('./uploads/dssv_duoc_dki_detai.xlsx');

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

                for(var i=0;i<xxx.length;i++){
                    var post =xxx[i];
                    console.log(post);
                    con.query('UPDATE nguoihoc SET duocDangKiKhoaLuanKhong=? WHERE MSSV="'+post.MSSV+'"',1,
                    function (err, result) {
                        if (err) throw err;
                        console.log('update ok');
                    })

                    con.query('SELECT vnuMail FROM nguoihoc WHERE MSSV=?',post.MSSV,function (err, result) {
                        if(err) throw err;
                        console.log(result[0].vnuMail);
                        post.vnuMail= result[0].vnuMail;
                        mailer.mailTo(post,function(error, info) {
                            if (error) {
                                return console.error(error);
                            }
                            console.log('Message sent: ' + info.response);
                        })
                    })
                }
            })
}
