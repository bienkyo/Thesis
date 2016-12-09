var express = require('express');
var orm     = require('orm');
var con     = require('../../utils/sqlhelper');
module.exports = function (app) {
    app.get('/users/gioithieuchung',function (req, res) {
        res.render('introduce');
    });
    app.get('/users/donvi',function (req, res) {
        con.query('SELECT * FROM khoa',function (err, rows) {
            res.render('donvi',{
                "khoa":rows
            });
        })
    });

    app.get('/users/donvi/cntt',function (req, res) {
        con.query('SELECT * FROM bomon WHERE khoa_khKhoa=?','cntt',function (err, rows) {
            if (err) throw err;
            console.log(rows);
            res.render('bomon',{
                "bomon":rows
            })
        })
    });
    // app.get('/users/donvi/bomon/mvttmt',function (req,res) {
    //     con.query('SELECT * FROM giangvien WHERE khBomon=?','mvttmt',function (err, rows) {
    //         if(err) throw err;
    //         //console.log(rows);
    //         res.render('giangvien/info_giangvien_bomon',{
    //             "row":rows
    //         })
    //         // for (var i=0;i<rows.length;i++){
    //         //     console.log(rows[i]);
    //         // }
    //     })
    // })
    // app.get('/users/donvi/bomon/khvkttt',function (req,res) {
    //     con.query('SELECT * FROM giangvien WHERE khBomon=?','khvkttt',function (err, rows) {
    //         if(err) throw err;
    //         console.log(rows);
    //         res.render('giangvien/info_giangvien_bomon',{
    //             "row":rows
    //         })
    //
    //     })
    // })
    // app.get('/users/donvi/bomon/khmt',function (req,res) {
    //     con.query('SELECT * FROM giangvien WHERE khBomon=?','khmt',function (err, rows) {
    //         if(err) throw err;
    //         console.log(rows);
    //         res.render('giangvien/info_giangvien_bomon',{
    //             "row":rows
    //         })
    //     })
    // })
    // app.get('/users/donvi/bomon/httt',function (req,res) {
    //     con.query('SELECT * FROM giangvien WHERE khBomon=?','httt',function (err, rows) {
    //         if(err) throw err;
    //         console.log(rows);
    //         res.render('giangvien/info_giangvien_bomon',{
    //             "row":rows
    //         })
    //     })
    // })
    // app.get('/users/donvi/bomon/cnpm',function (req,res) {
    //     con.query('SELECT * FROM giangvien WHERE khBomon=?','cnpm',function (err, rows) {
    //         if(err) throw err;
    //         console.log(rows);
    //         res.render('giangvien/info_gv_bm',{
    //             "row":rows
    //         })
    //     })
    // })


}