const user = require("../models/user");

const chalk = require('chalk');
console.log(chalk.greenBright(" Creating Site Super Admin AKA HR..."));

user.findOne({
    email : "hr@site.com"
}).then(data => {
    if (!data) {
        const newUser = new user({
            email: "hr@site.com",
            phone: "hr",
            password: "welcome",
            name: "Administrator",
            profilePic:"/assets/img/admin.svg",
            department:"Human Resource",
            isHod:false,
            status: true,
            role:"hr",
            superUser:true,
            gender:"user"
        });
            newUser.save()
            .then((user) => {
                console.log(chalk.blackBright("Human Resource Created"));
            }).catch(error=>{
                console.log(error);
            });
    }else{
        console.log(chalk.yellowBright("Human Resource Already Exist"));
    }
}).catch(error => {
    console.log(error);
})
