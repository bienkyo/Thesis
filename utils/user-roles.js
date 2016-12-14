var ConnectRoles = require('connect-roles');
var user = new ConnectRoles({
    failureHandler: function (req, res, action) {
        // optional function to customise code that runs when
        // user fails authorisation
        var accept = req.headers.accept || '';
        res.status(403);

        res.send('Access Denied - You don\'t have permission to: ' + action);

    }
});


//anonymous users can only access the home page
//returning false stops any more rules from being
//considered
user.use(function (req, action) {
    if (!req.isAuthenticated()) return action === 'access home page';
})

//moderator users can access private page, but
//they might not be the only ones so we don't return
//false if the user isn't a moderator


user.use('giangvien', function (req) {
    if (req.user.quyen === 'giang_vien') {
        return true;
    }
})
user.use('sinhvien', function (req) {
    if (req.user.quyen == null) {
        return true;
    }
})

//admin users can access all pages
user.use(function (req) {
    if (req.user.quyen === 'admin') {
        return true;
    }
});

module.exports = user;