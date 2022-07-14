var mongoose = require('mongoose');

var departmentsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,' required']
    },
    HOD:{
        type:String
    },
    hodID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    detail:{
        type:String,
        required:[true,' required']
    },
    min:{
        type:Number,
        required:[true,' required']
    }
   
},
    {
        timestamps: true
    })

module.exports = mongoose.model('departments',departmentsSchema);
