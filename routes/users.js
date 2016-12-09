var express = require('express');
var router  = express.Router();
var orm     = require('orm');
var Sequelize = require('sequelize');
var con       = require('../utils/sqlhelper');

router.get('/login',function (req, res, next) {
    res.render('login');
});

// router.get('/profile',function (req, res) {
//     res.render('profile');
// })
// router.post('/login',function (req, res) {
//     var userName = req.body.username;
//     var password = req.body.password;
//     console.log(userName+' '+ password);

    orm.connect('mysql://root:yahoo24@localhost/mydb',function (err, db) {
        if(err) throw err;

        db.load('../models/user',function (err) {
            if (err) throw err;

            var Person = db.models.user;



            router.post('/profile',function (req, res) {
                var userName= req.body.username;
                console.log(userName);

                var password= req.body.password;
                Person.find({tenNguoiDung:userName,matKhau:password},function (err, person) {
                    if(err) throw err;


                    if(person[0]==null){
                        console.log('not exist account, please try again');
                    } else if(person[0].quyen=='admin'){
                        var id;
                        module.exports.id= person[0].id;
                        console.log('ban la admin');
                        res.render('admin/admin',{
                            "row":person[0]
                        })
                    } else if(person[0].quyen=='giang_vien'){
                        console.log('ban la giang vien');
                        module.exports.id= person[0].id;

                       // con.query('SELECT * FROM giangvien WHERE ID=?',person[0].id,function (err, gv) {
                            if (err) throw err;

                            // con.query('SELECT * FROM detai WHERE giangVien_ID=?',person[0].id,function (err, detai) {
                            //     if (err) throw err;
                            //     console.log(detai[0]);
                            //     res.render('giangvien/giangvien',{
                            //         "row":gv[0],
                            //         "username":userName,
                            //         "password":password,
                            //         "vnumail":person[0].vnuMail,
                            //         "detai": detai
                            //     })
                            // })



                        db.load('../models/giangvien', function (err) {
                            if (err) {
                                throw err;
                            }
                            db.load('../models/linhvuc', function (err) {
                                if (err) {
                                    throw err;
                                }
                                var LinhVuc = db.models.linhvuc;
                                var Giang_Vien = db.models.giangvien;
                                var NghienCuu = db.models.nghiencuu;
                                Giang_Vien.hasMany('linhvuc', LinhVuc, {}, {reverse: 'giangvien'});
                                NghienCuu.hasOne('giangvien', Giang_Vien, {reverse: 'nghiencuu'});
                                db.load('../models/detai',function (err) {
                                    if(err){
                                        throw err;
                                    }
                                    var Detai = db.models.detai;
                                    Giang_Vien.get(person[0].id, function (err, gv) {
                                        if (err) throw err;
                                        gv.getLinhvuc(function (err, linhvuc) {
                                            if (err) throw  err;
                                            var lvlienquan = linhvuc;

                                            gv.getNghiencuu(function (err, nghiencuus) {
                                                if (err) {
                                                    throw  err;
                                                }
                                                LinhVuc.find({}, function (err, linhvuc) {
                                                    if (err) {
                                                        throw err;
                                                    }
                                                    linhvuc.forEach(function (e) {
                                                        if (lvlienquan.find(function (lv) {
                                                                return lv.ID == e.ID;
                                                            })) {
                                                            e.checked = true;
                                                        }
                                                    });
                                                    Detai.find({giangVien_ID: person[0].id},function (err, detai) {
                                                        if(err) throw  err;
                                                        res.render('giangvien/giangvien', {
                                                            "row": gv,
                                                            "username": userName,
                                                            "password": person[0].tenNguoiDung,
                                                            "vnumail": person[0].vnuMail,
                                                            "linhvuc": linhvuc,
                                                            "nghiencuus": nghiencuus,
                                                            "detai": detai
                                                        });
                                                    })

                                                });
                                            });
                                        });
                                    });
                                });


                            })
                        });

                    } else if(person[0].quyen==null) {
                        console.log('ban la sinh vien');
                        console.log(person[0].id);

                        con.query('SELECT * FROM nguoihoc WHERE MSSV=?',person[0].id,function (err, rows) {
                            console.log(rows[0]);
                            con.query('SELECT * FROM user WHERE id=?',person[0].id,function (err, row) {
                                console.log(row[0]);
                                res.render('sinhvien/profile',{
                                    "nguoihoc":rows[0],
                                    "user":row[0]
                                });
                            })

                        })

                    }

                })
            });


        })
    })
// })

module.exports = router;

