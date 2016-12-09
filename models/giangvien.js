module.exports = function (db, cb) {
    db.load('./nghiencuu', function (err) {
        if (err) {
            return cb(err);
        }
        db.define("giangvien", {
            ID: Number,
            matKhau: String,
            soDienThoai: String,
            khoa_khKhoa: String,
            chuyenNganh: String,
            hocHam: String
        }, {
            id:"ID",
            methods: {
                infomation: function () {
                    return this.ID + ' mk:' + this.matKhau;
                }
            }
        });

        return cb();

    });
};