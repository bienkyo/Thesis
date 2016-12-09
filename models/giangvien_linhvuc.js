module.exports = function (db, cb) {
    db.define("giangvien_linhvuc",{
        giangvien_id: {type: 'serial', key: true},
        linhvuc_id: {type: 'serial', key: true}
    },{
    });
    return cb();
};

