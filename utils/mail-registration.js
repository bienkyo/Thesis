var nodemailer = require('nodemailer');

module.exports.mailTo = function(post, callback){
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      secure: true,
      auth:{
        user: 'thesismanagerbot@gmail.com',
        pass: 'thesismanager'
      }
    });
    var mainOptions = {
      from: 'No Reply <thesismanager_noreply@gmail.com>',
      to: post.vnuMail,
      subject: "Update your account",
      text: 'Use this password to update your account: ' + post.matKhau,
      html: 'Use this password to update your account:<p>' + post.matKhau + '</p>'
    };
    transporter.sendMail(mainOptions,callback);
    // function(error,info) {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log('Message sent: ' + info.response);
    // }
}
