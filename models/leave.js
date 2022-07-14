var mongoose = require('mongoose');

var leaveSchema = new mongoose.Schema({
    state:{
        type:String,
        required:[true,'name is required']
    },
    typeOfLeave:{
        type:String,
        required:[true,'Type Of is required']
    },
    start:{
        type:String,
        required:[true,'date of leave start is required']
    },
    end:{
        type:String,
        required:[true,'date of leave end is required']
    },
    userEmail:{
        type:String,
        required:[true,'Staff Email is required']
    },
    file:{
        type:Array
    },
    note:{
        type:String
    },
    hrNote:{
        type:String
    },
    requestTo:{
        type:String,
        required:[true,'Request Made to either HOD or HR or both is required']
    },
   
},
{
    timestamps: true
})

module.exports = mongoose.model('leaves',leaveSchema);