const departments = require("../models/departments");
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
const _ = require('lodash');
const chalk = require('chalk')
const user = require("../models/user");
const leave = require("../models/leave");
const notification = require("../models/notification");
const { getDiff } = require("../util/subractDate");
const { welcome } = require("../mail/welcome");
const { approved } = require("../mail/approve");
const { deny } = require("../mail/deny");
const { overDue } = require("../mail/overDue");
const { reminder } = require("../mail/reminder");


/**A notification system
 * @param {string} title This is the title of the alret
 * @param {string} message This is the short message of the alret
 * @param {string} body This is the body of the alret
 * @param {string} date This is the date of the alret
 * @param {string} sender Name Of the Sender Not ID
 * @param {string} receiver The ID of the receiver
 *@description This Function Save An Alert To A User
 */
 const addNotification =  (title,message,body,date,sender,receiver)=>{
    const data = {
        title: title,
        message:message,
        body:body,
        date:date,
        time:Date.now(),
        seen:false,
        sender:sender,
        receiver:receiver
    }
     notification.create(data)
     console.log('ran from notification');
}

/** Seen Nofitication 
 * @param {string} id this is the Id Of the notification
*/
const seenNotification = async (id)=>{
    const obj = {
        seen: true,
    }
    await notification.findById({
        _id: id
    }).then(data => {
        alertt = _.extend(data, obj);
        alertt.save()
    }).catch(error => {
        console.log(error);
    })
}



/**Return Home Page 
 * Todo Write test
 */
exports.getIndex =async (req,res,next) =>{
    const staff = await user.find({role:'staff'})
    const onleave = await user.find({isOnLeave:true})
    const over = await leave.find({state:'Overdue'})
    const all = await leave.find({})
    const pending = await leave.find({state:"Pending"})
    const dep = await departments.find({})
    res.render('hr/index',{staff,all,dep,pending, onleave,over});
}

exports.getHistory =async (req,res,next) =>{
    const all = await leave.find({})
    res.render('hr/history', {data:all,dayjs:dayjs});

}

/**To Veiw A Single History*/
exports.getOneHistory = (req,res)=>{
    leave.findOne({
        _id : req.params.id
    }).then(data =>{
        if(!data){
            return res.render('error')
        }
        res.render('hr/historyOne',{
            data : data,
            user:req.user
        })
    }).catch(error =>{
        res.render('message',{
        data : { 
            title:'Error',
            message:"No history Found"
        },
        user:req.user,
        })
    })
}


/**Return Request Page for those applying for loan 
 * Todo Write test
 */
 exports.getRequests = async (req,res,next) =>{
    user.find({}).then(staff => {
        leave.find({state:'Pending'}).then(data=>{
            res.render('hr/request',{
                data:data,
                user:staff
            })
         }).catch(err=>{
             console.log(err);
         })
    }).catch(err =>{
        console.log(err);
    })

}

exports.getRequest = async (req,res)=>{
    const staff = await user.findOne({ email : req.params.user })
    leave.findById({_id : req.params.id}).then(data=>{
        res.render('hr/requestOne',{
            data:data,
            user:staff
        })
     }).catch(err=>{
         console.log(err);
     })
     console.log(staff);
}

/**Return The staff Page 
 * Todo Write test
 */
 exports.getStaffs = (req,res,next) =>{
    user.find({
        role:"staff"
    }).then(data => {
        console.log(data);
        res.render('hr/staffs',{
            data:data,
            dayjs:dayjs
        });
    })

}


exports.getAStaffs = (req,res,next) =>{
    user.find({
        role:"staff",isOnLeave:true
    }).then(data => {
        console.log(data);
        res.render('hr/active',{
            data:data,
            dayjs:dayjs
        });
    })

}

/**Return Deparment Page 
 * Todo Write test
 * reassign HOD 
 * Rename Deparment 
 * veiw staff and number of a cative user in the department
 */
 exports.getDepartment = (req,res,next) =>{
    departments.find({

    }).then(data => {
        console.log(data);
        res.render('hr/departments',{
            data:data,
            dayjs:dayjs
        });
    })

}

/**Return Home Page 
 * Todo Write test
 */
 exports.getActive = (req,res,next) =>{
    res.render('hr/active');

}

/**Return Home Page 
 * Todo Write test
 */
 exports.getCreateDepartment = (req,res,next) =>{
    user.find({
        role:"staff",
        isHod:false
    }).then(
        data =>{
            res.render('hr/createDep',{
                data:data
            });
        }
    )
}

/**Return Home Page 
 * Todo Write test
 */
 exports.getCreateStaff = (req,res,next) =>{
    departments.find({
    }).then(
        data =>{
            res.render('hr/createSta',{
                data:data
            });
        }
    )
}

/**Login
 * Hr Get Login
 */
 exports.getLogin = (req,res,next) =>{
    res.render('hr/login');

}

exports.postCreateStaff = (req,res)=>{
    const body = req.body 
    user.findOne({
        email : body.email.toLowerCase()
    }).then(data => {
        if (!data) {
            const newUser = new user({
                email: body.email.toLowerCase(),
                phone: body.phone,
                password: "welcome",
                name: body.name,
                profilePic:"/assets/img/admin.svg",
                department:body.department,
                isHod:false,
                status: true,
                role:"staff",
                superUser:false,
                leaves:[
                    {
                        name:"Annual Leave",
                        rule:"All Gender And Must Be in A New Cycle",
                        days:30,
                        left:30
                    },
                    {
                        name:"Maternity Leave",
                        rule: "For Only Female Staff",
                        days:90,
                        left:90
                    },
                    {
                        name:"Sick Leave",
                        rule: "With Evidence",
                        days:10,
                        left:10
                    },
                    {
                        name:"Family and medical leave (FMLA)",
                        rule: "This Is Reqeusted At less 5 Days Ahead",
                        days:07,
                        left:07
                    },
                    {
                        name:"Unpaid Leave",
                        rule: "Reason Must Be Provided And With Notice Of 7 Days",
                        days:10,
                        left:10
                    },
                    {
                        name:"Educational Leave",
                        days:400,
                        left:400
                    }
                ],
                doe:body.doe,
                gender:body.gender,
                isOnLeave:false
            });
                newUser.save()
                .then((user) => {
                    console.log(chalk.blackBright("New User Created"));
                    welcome(body.email.toLowerCase())
                    res.redirect('/hr/staffs')
                }).catch(error=>{
                    console.log(error);
                });
        }else{
            console.log(chalk.yellowBright("Email Registered Already Exist"));
            res.send('<b>user with email exist go to staff page to manage </b> <br> <a href="/hr/staffs">click here</a>')
        }
    }).catch(error => {
        console.log(error);
    })

}

exports.postCreateDepartment = (req,res)=>{
    const body = req.body 
    var data = {
        name: body.name,
        HOD: body.hod,
        detail:body.detail,
        min:body.min
    }
    departments.create(data)
    .then(result=>{+
        res.redirect('/hr/departments')
    }).catch(error=>{
        res.status(500);
    })
}

exports.delDep = (req,res)=>{
    const id = req.params.id
    departments.findOneAndDelete({
        _id:id
    }).then(
        data =>{
            res.redirect('/hr/departments')
        }
    )
}

exports.getEditDepartment =async (req,res,next) =>{
    const id = req.params.id
    const staff = await user.find({role:"staff"})

    departments.findOne({
        _id:id
    }).then(
        data =>{
            res.render('hr/editDep',{
                data:data,
                user:staff
            });
        }
    )
}

exports.postEditDepartment = ( req, res, next)=>{
    const body = req.body;
    const obj = {
        name: body.name,
        HOD: body.hod,
        detail:body.detail,
        min:body.min
    }
    console.log(obj);
    departments.findById({
        _id: req.params.id
    }).then(data => {
        console.log(data);
        // function to update the new hod 
        if(obj.HOD !== data.HOD && obj.HOD !=='unassigned'){
            // Alert New Admin
            user.findOneAndUpdate()
        }
        //
        depd = _.extend(data, obj);
        depd.save((error, result) => {
            if(error) {
                console.log(error)
                res.status(500);
            } else {
                console.log("user updated")
                res.redirect('/hr/departments')
            }
        })
    }).catch(error => {
        res.status(500);
    })
}

exports.delStaff = (req,res)=>{
    const id = req.params.id
    user.findOneAndDelete({
        _id:id
    }).then(
        data =>{
            res.redirect('/hr/staffs')
        }
    )
}


/**Eidt Staff 
 * Fix Drop Bar
 */
exports.getEditStaff = async (req,res,next) =>{
    const id = req.params.id
    const dep = await departments.find({})

    user.findOne({
        _id:id
    }).then(
        user =>{
            res.render('hr/editStaff',{
                user:user,
                data: dep
            });
        }
    )
}

exports.postEditStaff = ( req, res, next)=>{
    const body = req.body;
    const obj = {
        name: body.name,
        email: body.email,
        phone:body.phone,
        department:body.department,
        gender:body.gender,
        doe:body.doe
    }
    user.findById({
        _id: req.params.id
    }).then(data => {
        depd = _.extend(data, obj);
        depd.save((error, result) => {
            if(error) {
                console.log(error)
                res.status(500);
            } else {
                res.redirect('/hr/staffs')
            }
        })
    }).catch(error => {
        res.status(500);
    })
}

/**This Check For the Remaining Date in The Type of leave */
const checkDate = (arr,typee)=>{
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if(element.name == typee){
            return element.left
        }
    }
}

exports.postRequest = async ( req, res, next)=>{
    const body = req.body;
    const obj = {
        state: body.state,
        start: body.start,
        end:body.end,
        hrNote:body.note
    }
    const me = await user.findOne({_id:body.userID})
    const totalDay = getDiff(body.start,body.end)

    // Return the user data 
    // Create 
    const dayss = getDiff(body.start,body.end)
    const miu = checkDate(me.leaves,body.type)
    const remain = miu - dayss

    // Running Nofification Here
    if(body.state == "Approved"){
    // Minus The Date From The User
     await user.updateOne({_id:body.userID,'leaves.name':body.type}, {'$set': {
         'leaves.$.left': remain
     }},)
     approved(body.email,body.start,body.end)
    addNotification(`Your leave Has Been Approved`,`Your Leaves Start On The ${body.start}`,`Your leave Has Been Approved,Your Leaves Start On The ${body.start} and End ${body.end} `,Date.now(),"HR",body.userID)
    }else if(body.state == "Denied"){
        deny(body.email)
        addNotification(`Your leave Has Been Denied`,`Your Leaves Request was deny`,`Check Your History For More Detail `,Date.now(),"HR",body.userID)
    }

    leave.findById({
        _id: req.params.id
    }).then(data => {
        depd = _.extend(data, obj);
        depd.save((error, result) => {
            if(error) {
                console.log(error)
                res.status(500);
            } else {
                res.redirect('/hr/requests/')
            }
        })
    }).catch(error => {
        res.status(500);
    })
}

exports.getDeny = async ( req, res, next)=>{
    const obj = {
        state: "Denied"
    }
    addNotification(`Your leave Has Been Denied`, `Your Leaves Request was deny`, `Check Your History For More Detail `, Date.now(), "HR", req.params.user)

    leave.findById({
        _id: req.params.id
    }).then(data => {
        depd = _.extend(data, obj);
        depd.save((error, result) => {
            if(error) {
                console.log(error)
                res.status(500);
            } else {
                res.redirect('/hr/requests/')
            }
        })
    }).catch(error => {
        res.status(500);
    })
}

exports.getCvs =async (req,res,next) =>{
    const myLeave = await leave.find({})
    res.type('text/csv')
    res.render('staff/csv',{
        data:myLeave,
        dayjs:dayjs
    });

}



exports.getSync = async (req,res)=>{
    const leaves = await leave.find({state:'Approved'})
    const Running = await leave.find({state:'Running'})
    // Start Approved Leaves
    leaves.forEach(val =>{
        if((new Date(val.start)).getTime() < Date.now()){
            // Check if status is false 
            user.findOne({email:val.userEmail}).then(data=>{
                if(data.isOnLeave){
                    // change leave state to system rejected
                    leave.findOneAndUpdate({_id:val._id},{state:"System Rejected"}).then(rej=>{
                        addNotification("Leave Rejected","The System Rejected This Leave","You cant Start a new leave On Leave",Date.now(),"System 🤖",data._id)
                    }).catch(err=>{
                        console.log(err);
                    })
                }else{
                    leave.findOneAndUpdate({_id:val._id},{state:"Running"}).then(rej=>{
                        addNotification("Leave Started","Enjoy Your Leave","Your Leave has Is Running",Date.now(),"System 🤖",data._id)
                    }).catch(err=>{
                        console.log(err);
                    })
                    user.findOneAndUpdate({_id:data._id},{isOnLeave:true}).then(datal =>{
                        console.log(`Started Leave for ${data.name}`);
                    })
                }
            })
            //change state to true and start leave and send notifcation to both hr and worker
        }
    })

    //Check For Days Leave Seen Reminder and also change to over due
    Running.forEach(value =>{
        //check count down Aka reminder system
        const dayLeft = getDiff(value.end,Date.now()) - 1   
        
        if(dayLeft < 4 && dayLeft !== 0){
            reminder(value.email,dayLeft);
        }

        if(dayLeft < 0){
            leave.findOneAndUpdate({_id:value._id},{state:"Over Due"}).then(rej=>{
                addNotification("Leave Not Ended","Day Excess","Your Leave has Is Over Due",Date.now(),"System 🤖",data._id)
                overDue(value.email)
            }).catch(err=>{
                console.log(err);
            })
        }



    })

    res.end()

    // send countdown
    //alert over due leave
}