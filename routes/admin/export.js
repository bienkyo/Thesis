var ORMConnector = require('../../utils/orm-connector');
var user = require('../../utils/user-roles');
module.exports = function (app) {
    app.get('/users/admin/export',user.is('admin'), function (req, res) {
        var type = req.query.type;
        var id = req.query.id;
        if (type == null || id == null) {
            res.end('Invalid param');
            return;
        }
        if(type == 0){
            ORMConnector(function (err, db) {
                if (err) {
                    throw err;
                }
                db.load('../../models/detai', function (err) {
                    if (err) throw err;
                    var Detai = db.models.detai;
                    Detai.get(id,function (err, detai) {
                        if(err) throw  err;
                        res.render('export',{detai:detai});
                    })
                });

            });
        }

    });
    app.get('/users/admin/export',user.is('admin'), function (req, res) {
        var type = req.query.type;
        var id = req.query.id;
        if (type == null || id == null) {
            res.end('Invalid param');
            return;
        }
        if(type == 0){
            ORMConnector(function (err, db) {
                if (err) {
                    throw err;
                }
                db.load('../../models/detai', function (err) {
                    if (err) throw err;
                    var Detai = db.models.detai;
                    Detai.get(id,function (err, detai) {
                        if(err) throw  err;
                        res.render('export',{detai:detai});
                    })
                });

            });
        }

    });
}