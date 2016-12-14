var express = require('express');
var orm = require('orm');

module.exports = function (app) {
    app.post('/users/giangvien/linhvuc', function (req, res) {

        console.log(JSON.stringify(req.body));
        orm.connect('mysql://root@localhost/mydb', function (err, db) {
            if (err) throw err;
            db.load('../../models/giangvien_linhvuc',function (err) {
                if (err) throw err;
                var LinhvucLienquan = db.models.giangvien_linhvuc;

                LinhvucLienquan.find({giangvien_id: req.user.id}).remove(function (err) {
                    if (err) {
                        throw err;
                    }

                    var linhvuc = [];
                    if (!req.body.linhvuc){
                        res.json({success: true});
                        return;
                    }
                    else if(req.body.linhvuc instanceof Array){
                        req.body.linhvuc.forEach(function (linhvucId) {
                            linhvuc.push({giangvien_id: req.user.id, linhvuc_id: linhvucId});
                        });
                    }else {
                        linhvuc.push({giangvien_id: req.user.id, linhvuc_id: req.body.linhvuc});
                    }
                    LinhvucLienquan.create(linhvuc, function (err, items) {
                        if (err) {
                            throw err;
                        }
                        console.log('[Inserted]: ' + JSON.stringify(items));
                        res.json({success: true});
                    });
                });
            });

        });

    });


};