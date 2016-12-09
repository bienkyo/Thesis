module.exports = function (db, cb) {
    db.define("bomon",{
        tenBoMon      : String,
        moTa  : String,
        khoa_khKhoa  : String,
        khBomon      : String
    },{
        methods : {
            infomation : function () {
                return this.tenBoMon +' mk:' + this.moTa;
            }
        }
    });

    return cb();
};