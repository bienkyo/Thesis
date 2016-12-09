module.exports = function (db, cb) {
    db.define("khoa",{
        khKhoa      : String,
        tenKhoa  : String,
        vanPhongKhoa  : String,
        moTa        : String
    },{
        methods : {
            infomation : function () {
                return this.tenKhoa +' mk:' + this.moTa;
            }
        }
    });

    return cb();
};