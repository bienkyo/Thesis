var express =require('express');
var conn    = require('../../utils/sqlhelper');
var orm     = require('orm');

module.exports = function (app) {
    app.get('/users/chudenc',function (req, res) {
        conn.query('SELECT * FROM nghiencuu',function (err, rows) {
            if (err) throw err;

            res.render('nghiencuu/chudenghiencuu',{
                "rows":rows
            })
        })
    });

    app.post('/users/chudenc/giangvien',function (req, res) {
        var id=req.body.idGv;
        console.log(req.body.idGv);

        orm.connect('mysql://root@localhost/mydb',function (err, db) {
            if (err) throw err;

            db.load('../../models/giangvien');
            var gv = db.models.giangvien;

            gv.find({ID:id},function (err,person) {
                if (err) throw err;

                console.log(person[0].matKhau);
                db.load('../../models/user');
                var user = db.models.user;
                user.find({id:id},function (err,per) {
                    if (err) throw err;

                    res.render('nghiencuu/giangvien',{
                        "row": person[0],
                        "username":per[0].tenNguoiDung,
                        "password":per[0].matKhau,
                        "vnumail":per[0].vnuMail
                    })
                })
            })
        })
    })
}