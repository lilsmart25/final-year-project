const nodemailer = require('nodemailer');
const keys = require('./key');

/**This Function Sent the user his password */
const reminder =  (email,day) =>{
    var transporter = nodemailer.createTransport({
        host: keys.mail.host,
        port: keys.mail.port,
        auth: {
            user: keys.mail.user,
            pass: keys.mail.pass
        }
    });
    
    { 
        console.log('from nodemailer reminder');
        const mailOptions = {
            from: keys.mail.user,
            to:  keys.mail.user,
            subject: ` Leave reminder`,
            html:`
                Your Leave is going to end in ${day} days 
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
exports.reminder = reminder;