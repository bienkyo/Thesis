var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var formidable = require('formidable');
var fs         = require('fs');
var multer     = require('multer');
var db1         = require('mysql');
var Sequelize   = require('sequelize');
var xlsx        = require('xlsx');
var routes = require('./routes/index');
var users = require('./routes/users');


//var profile = require('./routes/profile');
//upload file
//var upload = require('./routes/upload');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
//app.set('views', path.join(__dirname, 'html'));
//app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'ejs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



app.use('/', routes);
app.use('/users', users);
//app.use('/users/profile',profile);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});

require('./routes/info_giangvien.js')(app);

//Upload file giang vien

// read file xlsx to mysql
var secondFunction = function () {
    require('./routes/phantichExel/xlsx.js')(app);
}
var firstFunction = function () {

    app.post('/users/profile/uploadgv', function(req, res){
        setTimeout(secondFunction,5000);
        // create an incoming form object
        var form = new formidable.IncomingForm();

        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, '/uploads');

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });

        // log any errors that occur
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        // once all the files have been uploaded, send a response to the client
        form.on('end', function() {
            res.end('success');
        });

        // parse the incoming request containing the form data
        form.parse(req);
        //console.log(req.file);
        //require('./routes/xlsx.js')(app);
    });
}

firstFunction();

//finish upload file giang vien

//Upload file sinh vien

var threeFunction = function () {

    app.post('/users/profile/uploadsv', function(req, res){

        var fourFunction = function () {
            require('./routes/phantichExel/xlsxsv.js')(app);
        }

        setTimeout(fourFunction,5000);
        // create an incoming form object
        var form = new formidable.IncomingForm();

        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, '/uploads');

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });

        // log any errors that occur
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        // once all the files have been uploaded, send a response to the client
        form.on('end', function() {
            res.end('success');
        });

        // parse the incoming request containing the form data
        form.parse(req);
        //console.log(req.file);
        //require('./routes/xlsx.js')(app);
    });
}

threeFunction();
//finish upload fil sinh vien

//upload file sinh vien co du dieu kien dang ky khoa luan
var fiveFunction = function () {

    app.post('/users/profile/uploaddkdetai', function(req, res){

        var sixFunction = function () {
            require('./routes/phantichExel/xlsxdkdetai.js')(app);
        }

        setTimeout(sixFunction,5000);
        // create an incoming form object
        var form = new formidable.IncomingForm();

        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, '/uploads');

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });

        // log any errors that occur
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        // once all the files have been uploaded, send a response to the client
        form.on('end', function() {
            res.end('success');
        });

        // parse the incoming request containing the form data
        form.parse(req);
        //console.log(req.file);
        //require('./routes/xlsx.js')(app);
    });
}

fiveFunction();
//finish upload file sinh vien co du dieu kien dang ki khoa luan



require('./routes/admin/add_giangvien.js')(app);
require('./routes/admin/quanly.js')(app);
require('./routes/admin/detai.js')(app);
require('./routes/admin/export.js')(app);
require('./routes/giangvien/edit.js')(app);
require('./routes/giangvien/quanly.js')(app);
require('./routes/admin/add_sinhvien.js')(app);
require('./routes/main/main.js')(app);
require('./routes/nghiencuu/chudenghiencuu.js')(app);
require('./routes/sinhvien/guidetai.js')(app);
require('./routes/giangvien/detai.js')(app);
require('./routes/giangvien/linhvuc.js')(app);
require('./routes/giangvien/nghiencuu.js')(app);
