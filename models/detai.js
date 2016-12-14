module.exports = function (db, cb) {
    db.define("detai",{
        ID: {type: 'serial', key: true},
        tenDeTai: String,
        nguoiHoc_MSSV: String,
        giangVien_ID: Number,
        thoiGianNop: Date,
        thoiGianSua: Date,
        nopHoSoChua: Number,
        duocBaoVeKhong: Number,
        nopQuyenChua: Number,
        choDuocDuyet: Number
    },{
        methods : {
            infomation : function () {
                return this.tenBoMon +' mk:' + this.moTa;
            },
            xinHuy: function () {
                this.choDuocDuyet = 1;
                return this;
            }
        }
    });

    return cb();
};