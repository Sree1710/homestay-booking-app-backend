const mongoose=require('mongoose')
const propertyModel=mongoose.model("propertys",mongoose.Schema(
    {
        packName:{type:String,required:true},
        packDesc:String,
        packPhoto:String,
        packPrice:String
    }
))
module.exports=propertyModel