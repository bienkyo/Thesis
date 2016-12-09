module.exports = function (db, cb) {
    db.define("nguoihoc",{
        MSSV           : Number,
        tenNguoiHoc    : String,
        nghanhHoc_khNganh: String,
        khoaHoc_khKhoaHoc: String,
        vnuMail      : String,
        matKhau      : String,
        duocDangKiKhoaLuanKhong : Number
    },{
        methods : {
            infomation : function () {
                return this.tenNguoiHoc +' mk:' + this.matKhau;
            }
        }
    });
    return cb();
};
