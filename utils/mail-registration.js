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
      subject: "Xin chao, ",
      text: "Tai khoan de dang nhap he thong la\nUsername: " + post.tenNguoiDung + "\nPassword: " + post.matKhau,
      html: "Tai khoan de dang nhap he thong la</br>Username: " + post.tenNguoiDung + "</br>Password: " + post.matKhau
    };
    transporter.sendMail(mainOptions,callback);
    // function(error,info) {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log('Message sent: ' + info.response);
    // }
}
