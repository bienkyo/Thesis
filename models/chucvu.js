module.exports = function (db, cb) {
    db.define("chucvu",{
        id      : String,
        ten  : String},{
    });

    return cb();
};