const mongoose=require('mongoose')
const bookModel=mongoose.model("books",mongoose.Schema(
    {
        packName:String,
        Name:String,
        packbookDate:{type:String,required:true}
    }
))
module.exports=bookModel