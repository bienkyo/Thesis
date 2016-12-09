module.exports = function (db, cb) {
    db.define("linhvuc",{
        ID    : Number,
        tenLinhVuc : String
    },{

    });
    return cb();
};