var orm = require('orm');
module.exports = function (callback) {
    orm.connect('mysql://root:yahoo24@localhost/mydb', callback);
}