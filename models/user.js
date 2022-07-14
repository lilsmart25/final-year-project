const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    email:{
        type:String,
        require:true 
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    profilePic:{
        type:String,
        require:true
    },
    department:{
        type:String,
    },
    doe:{
        type:String,
    },
    isHod:{
        type:Boolean,
    },
    leaves:{
        type:Array,
    },
    isOnLeave:{
        type:Boolean,
    },
    status:{
        type:Boolean,
        default:true
    },
    superUser:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        require:true
    },
    

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('users',UserSchema);