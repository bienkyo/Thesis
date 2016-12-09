module.exports = function (db, cb) {
    db.define("chude",{
        tenChuDe    : String,
        linhVuc_ID : Number,
    },{
        id: "tenChuDe"
    });
    return cb();
};