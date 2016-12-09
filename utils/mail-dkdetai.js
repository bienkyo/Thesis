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
        subject: "Dang ky De tai",
        text: 'Ban duoc phep dang ki de tai ',
        html: 'Ban co the dang ky de tai:<p>' +'Ban cho thoi gian khoa mo dot dang ky de tai nhe'+ '</p>'
    };
    transporter.sendMail(mainOptions,callback);
    // function(error,info) {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log('Message sent: ' + info.response);
    // }
}
