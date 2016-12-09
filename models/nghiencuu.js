module.exports = function (db, cb) {
    db.define("nghiencuu",{
        giangvien_id        : { type: 'serial', key: true },
        chuDe_tenChuDe      : { type: 'text', key: true },
        moTa                : String
    },{
        methods : {
            infomation : function () {
                return this.ID +' mk:' + this.chuDe_tenChuDe;
            }
        }
    });

    return cb();
};