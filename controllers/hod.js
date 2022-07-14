const departments = require("../models/departments");
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
const _ = require('lodash');
const user = require("../models/user");
const { forgotPass } = require("../mail/forgotPass");
const notification = require("../models/notification");
const leave = require('../models/leave');
const { getDiff } = require("../util/subractDate");
const { alertHr } = require("../mail/alertHr");
const { getDistanceFromLatLonInKm } = require("../util/getLocation");
const { centerLat, centerLng } = require("../config/center");
/**Return Home Page 
 * Todo Write test
 */
exports.getIndex =async (req,res,next) =>{
    const myLeave = await leave.find({userID:req.user._id, state:'Approved'})
    const myPending = await leave.find({userID:req.user._id, state:'Pending'})
    const myRunning = await leave.find({userID:req.user._id, state:'Running'})
    const rejects = await leave.find({userID:req.user._id, state:'System Rejected'})
    var dayLeft = await req.user.leaves

    res.render('hod/index',{
        myLeave:myLeave,
        user:req.user,
        dayjs:dayjs,
        leave:myPending,
        running:myRunning,
        rejects:rejects,
        dayLeft:dayLeft
    });

}

/**Get Profile 
 * User Profile 
 */
exports.getProfile=(req,res)=>{
    res.render('hod/profile',{
        user:req.user
    })
}

exports.getEnd=(req,res)=>{
    res.render('hod/end',{
        user:req.user
    })
}

exports.postEnd=(req,res)=>{
    const d = req.body
    console.log(req.body);
    console.log("from the server");
    const lessThan5 = getDistanceFromLatLonInKm(centerLat,centerLng,d.lat,d.lon)
    console.log(lessThan5<6);
    if(!lessThan5 < 6){
    res.json({success:true})
    }else{
        res.render('hod/message', {
            data:{
                message:`You Are ${lessThan5}km away from the office \nleave Not Approved`,
                title:"Error"
                },
            user:req.user,
        })
    }
}
/**Login
 * Staff Get Login
 */
 exports.getLogin = (req,res,next) =>{
    res.render('hod/login');

}

/**Return Request Page for those Who forgot password
 */
 exports.getForgot = (req,res,next) =>{
    res.render('hod/forgot');
}

/**Return Leave Elig...
 */
 exports.getEligible = (req,res,next) =>{
    res.render('hod/eligible',{
        data:req.user,
        user:req.user,
    });
}

/**Return Post for those Who forgot password
 */
 exports.postForgot =async (req,res,next) =>{
    const data =req.body
    const users = await user.findOne({email:data.email.toLowerCase()})

    if(!users){
        res.send("No User With That Email Found")
    }else if(users.email == 'hr@site.com'){
        res.send("Permission Denial")
    }else{
        forgotPass(users.email,users.name, users.password)
        res.send("check email Password Sent ")
    }
}

/**Return Request Page for those applying for loan 
 * Todo Write test
 */
 exports.getRequests = (req,res,next) =>{
    res.render('hod/request',{
        user:req.user
    });

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
        res.render('hod/departments',{
            data:data,
            dayjs:dayjs,
            user:req.user,
        });
    })

}

/**Return Home Page 
 * Todo Write test
 */
 exports.getActive = (req,res,next) =>{
    res.render('hod/active');

}

/**Return Home Page 
 * Todo Write test
 */
 exports.getCreateDepartment = (req,res,next) =>{
    res.render('hod/createDep');

}

/**Return Home Page 
 * Todo Write test
 */
 exports.getCreateStaff = (req,res,next) =>{
    res.render('hod/createSta');

}



exports.postCreateStaff = (req,res)=>{
    // const body = req.body 
    // user.findOne({
    //     username : "hr"
    // }).then(data => {
    //     if (!data) {
    //         const newUser = new user({
    //             username: "hr",
    //             email: "hr@site.com",
    //             phone: "hr",
    //             password: "hr",
    //             name: "Administrator",
    //             profilePic:"/users/assets/images/admin.svg",
    //             department:"Human Resource",
    //             isHod:false,
    //             status: true,
    //             role:"hr",
    //             superUser:true,
    //         });
    //             newUser.save()
    //             .then((user) => {
    //                 console.log(chalk.blackBright("Human Resource Created"));
    //             }).catch(error=>{
    //                 console.log(error);
    //             });
    //     }else{
    //         console.log(chalk.yellowBright("Human Resource Already Exist"));
    //     }
    // }).catch(error => {
    //     console.log(error);
    // })
    
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
        res.redirect('/hod/departments')
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
            res.redirect('/hod/departments')
        }
    )
}

exports.getEditDepartment = (req,res,next) =>{
    const id = req.params.id
    departments.findOne({
        _id:id
    }).then(
        data =>{
            res.render('hod/editDep',{
                data:data
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
    departments.findById({
        _id: req.params.id
    }).then(data => {
        user = _.extend(data, obj);
        user.save((error, result) => {
            if(error) {
                console.log(error)
                res.status(500);
            } else {
                console.log("user updated")
                res.redirect('/hod/departments')
            }
        })
    }).catch(error => {
        res.status(500);
    })
}

/**A notification system
 * @param {string} title This is the title of the alret
 * @param {string} message This is the short message of the alret
 * @param {string} body This is the body of the alret
 * @param {string} date This is the date of the alret
 * @param {string} sender Name Of the Sender Not ID
 * @param {string} receiver The ID of the receiver
 *@description This Function Save An Alert To A User
 */
const addNotification = async (title,message,body,date,sender,receiver)=>{
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
    await notification.create(data)
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


/* To get user notification */
exports.getNotfication = (req,res)=>{
    notification.find({
        receiver : req.user._id
    }).then(data =>{
        res.render('hod/notifications',{
            data : data,
            user:req.user,
        })
    }).catch(error =>{
        res.send(error)
    })
}

/**To Veiw A Single Notification */
exports.getOneNotfication = async (req,res)=>{
    await seenNotification(req.params.id)
    notification.findOne({
        _id : req.params.id
    }).then(data =>{
        if(!data){
            return res.render('error')
        }
        res.render('hod/notificationOne',{
            data : data,
            user:req.user,
        })
    }).catch(error =>{
        res.render('404')
    })
}


/**Return Request Page for those applying for loan 
 * Todo Write test
 */
 exports.postRequests = (req,res,next) =>{
    const file = req.files;
    const data = req.body
    if (!file) {
        const error = new Error("please upload a file");
        error.httpStatusCode = 400;
        return next(error)
    }
    var images = [];

    for (let index = 0; index < file.length; index++) {
        //    images.push(file[index])
        images.push((file[index].path).slice(7,));

    }

    alertHr('smart@godwinsmith.com')

    var myleave = new leave({
        userEmail :req.user.email,
        typeOfLeave:data.type,
        start: data.start,
        end: data.end,
        state:"Pending",
        file:images,
        note:data.note,
        requestTo:data.r2u,
    }); 

    myleave.save().then(data =>{
        res.render('hod/message', {
            data:{
                message:"Leave Request Sent",
                title:"Request Recevice"
                },
            user:req.user,
        })
    })

}


exports.getHistory = (req,res,next) =>{
    leave.find({
        userID:req.user._id
    }).then(data => {
        console.log(data);
        res.render('hod/history',{
            data:data,
            dayjs:dayjs,
            user:req.user,
        });
    })

}

/**To Veiw A Single History*/
exports.getOneHistory = (req,res)=>{
    leave.findOne({
        _id : req.params.id
    }).then(data =>{
        if(!data){
            return res.render('error')
        }
        res.render('hod/historyOne',{
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

exports.getCvs =async (req,res,next) =>{
    const myLeave = await leave.find({userID:req.user._id})
    res.type('text/csv')
    res.render('hod/csv',{
        data:myLeave,
        dayjs:dayjs
    });

}

/**Return The staff Page 
 * Todo Write test
 */
 exports.getStaffs = (req,res,next) =>{
    user.find({
        role:"staff",department:req.user.department
    }).then(data => {
        console.log(data);
        res.render('hod/staffs',{
            data:data,
            dayjs:dayjs
        });
    })

}



exports.getHODCvs =async (req,res,next) =>{
    const myLeave = await leave.find({userID:req.user._id})
    res.type('text/csv')
    res.render('hod/csv',{
        data:myLeave,
        dayjs:dayjs
    });

}
