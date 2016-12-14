var express = require('express');
var router = express.Router();
var orm = require('orm');
var Sequelize = require('sequelize');
var con = require('../utils/sqlhelper');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    orm.connect('mysql://root@localhost/mydb', function (err, db) {
        if (err) throw err;

        db.load('../models/user', function (err) {
            if (err) throw err;

            var Person = db.models.user;
            Person.get(id, function (err, person) {
                done(err, person);
            })
        });
    });
});

passport.use(new LocalStrategy(function (username, password, done) {
    orm.connect('mysql://root@localhost/mydb', function (err, db) {
        if (err) throw done(err);

        db.load('../models/user', function (err) {
            if (err) throw done(err);

            var Person = db.models.user;
            Person.find({tenNguoiDung: username}, function (err, person) {

                if (err) throw  done(err);
                var user = person[0];
                if (!user) {
                    console.log('Unknown user');
                    return done(null, false, {message: 'Tên người dùng không tồn tại'});
                }

                if (!user.validPassword(password)) {
                    return done(null, false, {message: 'Sai mật khẩu'});
                }
                return done(null, user);
            });
        });
    });
}));


router.get('/login', function (req, res, next) {
    res.render('login');
});


// router.get('/profile',function (req, res) {
//     res.render('profile');
// })
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password'
}), function (req, res) {
    console.log('Authentication successfull');
    res.redirect('/users/profile');
});

router.get('/profile', function (req, res) {
    var user = req.user;
    orm.connect('mysql://root@localhost/mydb', function (err, db) {
        if (user == null) {
            console.log('not exist account, please try again');
        } else if (user.quyen == 'admin') {
            var id;
            module.exports.id = user.id;
            console.log('ban la admin');

            con.query('SELECT * FROM detai WHERE duocBaoVeKhong=1',function (err, result) {
                if(err) throw err;
                console.log(result);
                res.render('admin/admin', {
                    "row": user,
                    "detais": result
                })
            })

        }
        else if (user.quyen == 'giang_vien') {
            console.log('ban la giang vien');
            module.exports.id = user.id;
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
                    db.load('../models/detai', function (err) {
                        if (err) {
                            throw err;
                        }
                        var Detai = db.models.detai;
                        Giang_Vien.get(user.id, function (err, gv) {
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
                                        Detai.find({giangVien_ID: user.id}, function (err, detai) {
                                            if (err) throw  err;
                                            res.render('giangvien/giangvien', {
                                                "row": gv,
                                                "username": user.tenNguoiDung,
                                                "password": user.matKhau,
                                                "vnumail": user.vnuMail,
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

        }
        else if (user.quyen == null) {
            console.log('ban la sinh vien');
            console.log(user.id);

            con.query('SELECT * FROM nguoihoc WHERE MSSV=?', user.id, function (err, rows) {

                console.log(rows[0]);
                con.query('SELECT * FROM detai WHERE nguoiHoc_MSSV=? order by choDuocDuyet', user.id, function (err, row) {
                    if(err){
                        console.log(err.message);
                    }
                    con.query('SELECT * FROM giangvien',function (err, giangvien) {
                        if(err){
                            console.log(err.message);
                        }
                        var detai = null;
                        if(row){
                            detai = row[0];
                        }
                        res.render('sinhvien/profile', {
                            "nguoihoc": rows[0],
                            "user": user,
                            "detai": detai,
                            "giangvien": giangvien
                        });
                    });

                })

            })

        }
    });

});

router.get('/logout',function (req, res) {
    req.logout();
    res.redirect('/login');
});


module.exports = router;

