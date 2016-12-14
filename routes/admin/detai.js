var express = require('express');
var bodyParser = require('body-parser');
var con = require('../../utils/sqlhelper');
var ORMConnector = require('../../utils/orm-connector');
var orm = require('orm');

module.exports = function (app) {
    //app.use(bodyParser.urlencoded());

    app.post('/users/admin/adddkdetai', function (req, res) {
        console.log(req.body.msv);
        con.query('UPDATE nguoihoc SET duocDangKiKhoaLuanKhong=? WHERE MSSV="' + req.body.msv + '"', 1,
            function (err, result) {
                if (err) throw err;
                console.log('add ok');
            })
    });

    app.post('/users/admin/editdkdetai', function (req, res) {
        console.log(req.body.msv);
        con.query('UPDATE nguoihoc SET duocDangKiKhoaLuanKhong=? WHERE MSSV="' + req.body.msv + '"', 1,
            function (err, result) {
                if (err) throw err;
                console.log('edit ok');
            })
    });


    app.post('/users/admin/deletedkdetai', function (req, res) {
        console.log(req.body.msv);
        con.query('UPDATE nguoihoc SET duocDangKiKhoaLuanKhong=? WHERE MSSV="' + req.body.msv + '"', 0,
            function (err, result) {
                if (err) throw err;
                console.log('delete ok');
            })
    });
    app.get('/users/admin/detaichoduyet', function (req, res) {

        ORMConnector(function (err, db) {
            if (err) {
                throw err;
            }
            db.load('../../models/detai', function (err) {
                if (err) throw err;
                var Detai = db.models.detai;
                Detai.find({'choDuocDuyet': orm.gt(0)}).each(function (dt) {
                    dt.yeuCau = dt.choDuocDuyet == 1 ? 'Rút đề tài' : 'Sửa đề tài';
                }).get(function (detai) {
                    if (err) {
                        console.log(err.message);
                    } else {
                        res.json({
                            success: true,
                            data: detai
                        });
                    }
                });
            });
        });
    });

    app.post('/users/admin/detaichoduyet/reject/:id', function (req, res) {
        var id = req.params.id;
        ORMConnector(function (err, db) {
            if (err) {
                throw err;
            }
            db.load('../../models/detai', function (err) {
                if (err) throw err;
                var Detai = db.models.detai;
                Detai.get(id, function (err, detai) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (detai.choDuocDuyet == 1) {
                        //Tu choi huy de tai
                        detai.save({choDuocDuyet: 0}, function (err) {
                            if (err) {
                                console.log(err.message);
                            }
                            console.log('da tu choi yeu cau');
                            res.json({
                                success: true
                            });
                        });
                    } else if (detai.choDuocDuyet == 2) {
                        detai.remove(function (err) {
                            if (err) throw  err;
                            res.json({success: true});
                        });
                    }


                });
            });
        });
    });

    app.post('/users/admin/detaichoduyet/accept/:id', function (req, res) {
            var id = req.params.id;
            ORMConnector(function (err, db) {
                if (err) {
                    throw err;
                }
                db.load('../../models/detai', function (err) {
                    if (err) throw err;
                    var Detai = db.models.detai;
                    Detai.get(id, function (err, detai) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (detai.choDuocDuyet == 1) {
                            //Yeu cau huy chap nhan
                            detai.remove(function (err) {
                                if (err) {
                                    console.log(err.message);
                                }
                                console.log('da xoa de tai');
                                res.json({
                                    success: true
                                });
                            })

                        } else if (detai.choDuocDuyet == 2 && detai.nopQuyenChua == 1) {
                            //Yeu cau sua doi dc chap nhan

                            Detai.find({ID: orm.ne(detai.ID), nguoiHoc_MSSV: detai.nguoiHoc_MSSV}).remove(function (err) {
                                if (err) throw  err;

                                detai.save({choDuocDuyet: 0}, function (err) {
                                    if (err) throw err;
                                    console.log('Da sua');
                                    res.json({success: true});
                                })
                            });
                        } else {
                            res.end('Unknown request');
                        }

                    })
                });
            });
        }
    )
    ;
}