var express = require('express');
var con = require('../../utils/sqlhelper');
module.exports = function (app) {
    app.post('/users/admin/tiepnhanbaove',function (req, res) {
        con.query('UPDATE detai SET duocBaoVeKhong=? WHERE nguoiHoc_MSSV="'+req.body.msv+'"',1,function (err, result) {
            if (err) throw err;

            console.log('bao ve thanh cong');
        })
    })
}