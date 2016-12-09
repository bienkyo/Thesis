var express = require('express');
var bodyParser = require('body-parser');
var con= require('../../utils/sqlhelper');

module.exports = function (app) {
    //app.use(bodyParser.urlencoded());

    app.post('/users/admin/adddkdetai',function (req, res) {
        console.log(req.body.msv);
        con.query('UPDATE nguoihoc SET duocDangKiKhoaLuanKhong=? WHERE MSSV="'+req.body.msv+'"',1,
            function (err, result) {
                if (err) throw err;
                console.log('add ok');
            })
    });

    app.post('/users/admin/editdkdetai',function (req, res) {
        console.log(req.body.msv);
        con.query('UPDATE nguoihoc SET duocDangKiKhoaLuanKhong=? WHERE MSSV="'+req.body.msv+'"',1,
            function (err, result) {
                if (err) throw err;
                console.log('edit ok');
            })
    })

    app.post('/users/admin/deletedkdetai',function (req, res) {
        console.log(req.body.msv);
        con.query('UPDATE nguoihoc SET duocDangKiKhoaLuanKhong=? WHERE MSSV="'+req.body.msv+'"',0,
            function (err, result) {
                if (err) throw err;
                console.log('delete ok');
            })
})
}