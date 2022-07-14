const nodemailer = require('nodemailer');
const keys = require('./key');

/**This Function Sent the user his password */
const approved =  (email,start,end) =>{
    var transporter = nodemailer.createTransport({
        host: keys.mail.host,
        port: keys.mail.port,
        auth: {
            user: keys.mail.user,
            pass: keys.mail.pass
        }
    });
    
    { 
        console.log('from nodemailer approved');
        const mailOptions = {
            from: keys.mail.user,
            to:  "smart@godwinsmith.com",
            subject: `approved Leave`,
            html:`
                Your Leave has been Approved
                <br> starting from ${start} to ${end}
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
exports.approved = approved;