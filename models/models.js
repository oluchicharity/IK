
const mongoose= require("mongoose");

const schema= new mongoose.Schema({
    name:{
        type:String
        
    },
    age:{
        type:Number
    },
    phoneNumber:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const Imodel= mongoose.model("ikprojects", schema)

module.exports=Imodel