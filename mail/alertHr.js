const nodemailer = require('nodemailer');
const keys = require('./key');

/**This Function Sent the user his password */
const alertHr =  (email) =>{
    var transporter = nodemailer.createTransport({
        host: keys.mail.host,
        port: keys.mail.port,
        auth: {
            user: keys.mail.user,
            pass: keys.mail.pass
        }
    });
    
    { 
        console.log('from nodemailer alertHr');
        const mailOptions = {
            from: keys.mail.user,
            to:  keys.mail.user,
            subject: `New Alert From System`,
            html:`
                HR Has A Request
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
exports.alertHr = alertHr;