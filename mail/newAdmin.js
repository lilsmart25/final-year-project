const nodemailer = require('nodemailer');
const keys = require('./key');

/**This Function Sent A welcome mail to the admin */
const newAdmin =  (email, name) =>{
    var transporter = nodemailer.createTransport({
        host: keys.mail.host,
        port: keys.mail.port,
        auth: {
            user: keys.mail.user,
            pass: keys.mail.pass
        }
    });
    
    { 
        console.log('from nodemailer newAdmin');
        const mailOptions = {
            from: keys.mail.user,
            to:  email,
            subject: `Testing ${name}`,
            html:`
                Hi From Server
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
exports.newAdmin = newAdmin;