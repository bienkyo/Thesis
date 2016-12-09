var express = require('express');
var orm = require('orm');
var conn = require('../utils/sqlhelper');

module.exports = function (app) {
    app.get('/users/info_giangvien',function (req, res) {
    conn.query('SELECT giangvien.ID,giangvien.hocHam,giangvien.khoa_khKhoa,giangvien.chuyenNganh, ' +
        'nghiencuu.chuDe_tenChuDe,nghiencuu.moTa,user.tenNguoiDung ' +
        'FROM giangvien INNER JOIN nghiencuu on giangvien.ID=nghiencuu.giangVien_ID INNER JOIN user on giangvien.ID=user.id',
    function (err, rows) {
        if (err) {
            throw err;
        } else {
            console.log(rows);
            res.render('giangvien/info_giangvien',{
                "rows":rows
            })
        }
    })
})
}