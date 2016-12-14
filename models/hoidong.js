module.exports = function (db, cb) {
    db.define("hoidong",{
        maChucvu      : Number,
        giangVien_ID  : Number,
        ghiChu: String
    },{
    });

    return cb();
};