const nodemailer = require('nodemailer');
const keys = require('./key');

/**This Function Sent the user his password */
const welcome =  (email) =>{
    var transporter = nodemailer.createTransport({
        host: keys.mail.host,
        port: keys.mail.port,
        auth: {
            user: keys.mail.user,
            pass: keys.mail.pass
        }
    });
    
    { 
        console.log('from nodemailer welcome');
        const mailOptions = {
            from: keys.mail.user,
            to:  keys.mail.user,
            subject: `Welcome User`,
            html:`
                Welcome user 
                your username is ${email}
                your password is 'welcome'
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
exports.welcome = welcome;