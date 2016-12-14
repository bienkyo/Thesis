var ORMConnector = require('../../utils/orm-connector');
var con = require('../../utils/sqlhelper');
var user = require('../../utils/user-roles');
module.exports = function (app) {
    app.get('/users/admin/hoidong',user.is('admin'), function (req, res) {
        con.query('SELECT * FROM chucvu', function (err, chucvu) {
            if (err) {
                consol.log(err.message);
            }
            con.query('SELECT * FROM user where quyen = "giang_vien"', function (err, giangvien) {
                if (err) {
                    consol.log(err.message);
                }

                res.render('admin/hoidong', {chucvu: chucvu, giangvien: giangvien});

            });

        });

    });
    app.delete('/users/admin/hoidong.json/:id',function (req, res) {
        var id = req.params.id;

        con.query('DELETE FROM hoidong WHERE giangVien_ID = ?', id, function (err, result) {
            if (err) {
                console.log(err.message);
            }
            res.json({
                success: true
            });

        });
    });

    app.post('/users/admin/hoidong.json', function (req, res) {
        var hoidong = {
            giangVien_ID: req.body.giangvienId,
            maChucVu: req.body.chucvuId,
            ghiChu: req.body.ghichu
        }
        con.query('INSERT INTO hoidong SET ?', hoidong, function (err, result) {
            if (err) {
                console.log(err.message);
            }
            // con.query('SELECT * FROM hoidong INNER JOIN chucvu on hoidong.maChucVu = chucvu.id INNER JOIN user on hoidong.giangVien_ID = user.id', function (err, row) {
            //     if (err) {
            //         throw err;
            //     }
            //     res.json({
            //         data: row
            //     });
            // })

            res.json({
                success: true
            });

        });
    });
    app.get('/users/admin/hoidong.json', function (req, res) {
        con.query('SELECT * FROM hoidong INNER JOIN chucvu on hoidong.maChucVu = chucvu.id INNER JOIN user on hoidong.giangVien_ID = user.id', function (err, row) {
            if (err) {
                throw err;
            }
            res.json({
                data: row
            });
        })
    });
}