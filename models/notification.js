var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required']
    },
    message:{
        type:String,
        required:[true,'message is required']
    },
    body:{
        type:String,
        required:[true,'body is required']
    },
    date:{
        type:String,
        required:[true,'date is required']
    },
    time:{
        type:String,
        required:[true,'time is required']
    },
    seen:{
        type:Boolean,
        required:[true,'time is required']
    },
    sender:{
        type:String,
        required:[true,'sender is required']
    },
    recevier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
})

module.exports = mongoose.model('notification',notificationSchema);