const nodemailer = require('nodemailer');
const keys = require('./key');

/**This Function Sent the user his password */
const deny =  (email) =>{
    var transporter = nodemailer.createTransport({
        host: keys.mail.host,
        port: keys.mail.port,
        auth: {
            user: keys.mail.user,
            pass: keys.mail.pass
        }
    });
    
    { 
        console.log('from nodemailer deny');
        const mailOptions = {
            from: keys.mail.user,
            to:  "smart@godwinsmith.com",
            subject: ` Leave Deny`,
            html:`
                Your Leave has been Deny 
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
exports.deny = deny;