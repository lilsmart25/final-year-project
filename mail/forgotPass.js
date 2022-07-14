const nodemailer = require('nodemailer');
const keys = require('./key');

/**This Function Sent the user his password */
const forgotPass =  (email, name, password) =>{
    var transporter = nodemailer.createTransport({
        host: keys.mail.host,
        port: keys.mail.port,
        auth: {
            user: keys.mail.user,
            pass: keys.mail.pass
        }
    });
    
    { 
        console.log('from nodemailer forgotPass');
        const mailOptions = {
            from: keys.mail.user,
            to:  keys.mail.user,
            subject: `New Password For ${name} Account`,
            html:`
                password is - <b> ${password} </b>
            `
};
return transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
        console.log(error)
        return
    }
});
};
};
exports.forgotPass = forgotPass;