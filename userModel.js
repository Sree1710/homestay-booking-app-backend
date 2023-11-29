const mongoose=require('mongoose')
const userModel=mongoose.model("users",mongoose.Schema(
    {
        Name:{type:String,required:true},
        userDOB:String,
        userAddress:String,
        userPhNo:String,
        userEmail:String,
        username:String,
        password:String
    }
))
module.exports=userModel