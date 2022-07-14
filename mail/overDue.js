const nodemailer = require('nodemailer');
const keys = require('./key');

/**This Function Sent the user his password */
const overDue =  (email) =>{
    var transporter = nodemailer.createTransport({
        host: keys.mail.host,
        port: keys.mail.port,
        auth: {
            user: keys.mail.user,
            pass: keys.mail.pass
        }
    });
    
    { 
        console.log('from nodemailer overDue');
        const mailOptions = {
            from: keys.mail.user,
            to:  "smart@godwinsmith.com",
            subject: ` Leave overDue`,
            html:`
                Your Leave is overDue - Please Resume
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
exports.overDue = overDue;