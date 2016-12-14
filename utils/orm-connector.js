var orm = require('orm');
module.exports = function (callback) {
    orm.connect('mysql://root@localhost/mydb', callback);
}