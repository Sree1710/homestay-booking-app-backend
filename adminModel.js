const mongoose=require('mongoose')
const adminModel=mongoose.model("admins",mongoose.Schema(
    {
        username:String,
        password:String
    }
))
module.exports=adminModel