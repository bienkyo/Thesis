var express = require('express');
var User = require('../users');
var orm = require('orm');

module.exports = function (app) {
    app.post('/users/giangvien/nghiencuu', function (req, res) {

        console.log("Adding entry for user id " + req.user.id);

        orm.connect('mysql://root:yahoo24@localhost/mydb', function (err, db) {
            if (err) {
                throw err;
            }


            db.load('../../models/chude', function (err) {
                if (err) {
                    throw  err;
                }
                var ChuDe = db.models.chude;
                if (ChuDe.exists({tenChuDe: req.body.chude}, function (err, exists) {
                        if (err) {
                            throw err;
                        }

                        if (!exists) {
                            // if not exists, try to insert a new one
                            ChuDe.create({
                                tenChuDe: req.body.chude,
                                linhVuc_ID: req.body.linhvucId
                            }, function (err) {
                                if (err) {
                                    console.log(err.message);
                                    res.json({success: false});
                                }

                                db.load('../../models/nghiencuu', function (err) {
                                    if (err) {
                                        console.log(err.message);
                                    }
                                    var NghienCuu = db.models.nghiencuu;
                                    NghienCuu.create({
                                        giangvien_id: req.user.id,
                                        chuDe_tenChuDe: req.body.chude,
                                        moTa: req.body.mota
                                    }, function (err) {
                                        if (err) {
                                            throw err;
                                        }
                                        res.json({
                                            success: true,
                                            item: {
                                                chude: req.body.chude,
                                                mota: req.body.mota
                                            }
                                        });
                                        console.log("[Inserted]");

                                    });
                                });
                            });
                        } else {
                            db.load('../../models/nghiencuu', function (err) {
                                if (err) {
                                    throw err;
                                }
                                var NghienCuu = db.models.nghiencuu;
                                NghienCuu.create({
                                    giangvien_id: req.user.id,
                                    chuDe_tenChuDe: req.body.chude,
                                    moTa: req.body.mota
                                }, function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    res.json({
                                        success: true,
                                        item: {
                                            chude: req.body.chude,
                                            mota: req.body.mota
                                        }
                                    });
                                    console.log("[Inserted]");


                                });
                            });
                        }
                    }));
            });

        });

    });

    app.delete('/users/giangvien/nghiencuu/:id', function (req, res) {
        console.log('Remove userId=' + req.user.id + " chude=" + req.params.id);
        orm.connect('mysql://root:yahoo24@localhost/mydb', function (err, db) {
                if (err) {
                    throw  err;
                }

                db.load('../../models/nghiencuu', function (err) {
                    if (err) {
                        throw err;
                    }
                    var NghienCuu = db.models.nghiencuu;
                    NghienCuu.find(
                        {
                            giangvien_id: req.user.id,
                            chuDe_tenChuDe: req.params.id
                        }, function (err, nghiencuu) {
                            nghiencuu[0].remove(function (err) {
                                if (err) {
                                    throw err;
                                }
                                res.json({
                                    success: true
                                });
                            });

                        });

                });

            }
        );
    });
}
