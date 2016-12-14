var express = require('express');
var con = require('../../utils/sqlhelper');
var bodyParser = require('body-parser');

module.exports  = function (app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    var idAcong = 32;
    var idTung  = 234;

    app.post('/users/admin/phancongpbien',function (req, res) {

        var post1 ={
            giangVien_ID: idAcong,
            deTai_ID :req.body.mdt
        }
        var post2 ={
            giangVien_ID: idTung,
            deTai_ID: req.body.mdt
        }

        console.log(post1);
        console.log(post2);
        con.query('INSERT INTO phanbien SET ?',post1,function (err, result) {
            if (err){
                console.log('Insert that bai '+ JSON.stringify(post1));
            } else {
                console.log('insert thanh cong'+ JSON.stringify(post1));
            }
        })

        con.query('INSERT INTO phanbien SET ?',post2,function (err, result) {
            if (err){
                console.log('Insert that bai '+ JSON.stringify(post2));
            } else {
                console.log('insert thanh cong'+ JSON.stringify(post2));
            }
        })
    });

    app.post('/users/admin/exporttodoc',function (req, res) {
        console.log('kk');
        var tendetai = req.body.tendetai;
        var post1 ={
            giangVien_ID: idAcong,
            deTai_ID :req.body.mdt
        }
        con.query('SELECT * FROM user WHERE id=?',post1.giangVien_ID,function (err, result) {
            if (err) throw err;

            post1.tenGiangVien =result[0].tenNguoiDung;
        })
        var post2 ={
            giangVien_ID: idTung,
            deTai_ID: req.body.mdt
        }
        con.query('SELECT * FROM user WHERE id=?',post2.giangVien_ID,function (err, result) {
            if (err) throw err;

            post2.tenGiangVien =result[0].tenNguoiDung;
        })

        res.render('exportsphancongpbien',{
            "gv1":post1,
            "gv2":post2,
            "detai": tendetai
        })
    })
}