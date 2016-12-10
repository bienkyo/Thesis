var express = require('express');
var con = require('../../utils/sqlhelper');

module.exports = function (app) {
    app.post('/users/sinhvien/dkdetai',function (req,res) {
        var msv = req.body.msv;
        var detai = req.body.detai;
        var mailgv = req.body.mail;
        var madetai = req.body.madetai;
        con.query('SELECT id FROM user WHERE vnuMail=?',mailgv,function (err, result) {
            if (err) throw err;
            console.log(result[0].id);

            var post = {
                ID: madetai,
                tenDeTai: detai,
                nguoiHoc_MSSV: msv,
                giangVien_ID:result[0].id
            }
            con.query('INSERT INTO detai SET ?',post,function (err, kq) {
                if (err){
                    res.send('ban nhap sai thong tin, yeu cau nhap lai');
                }else {
                    console.log('insert ok');
                    res.send('Dang ky de tai Thanh cong, vui long cho phan hoi tu giang vien');
                }

            })

        })





    })
}