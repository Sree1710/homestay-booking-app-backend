const mongoose=require('mongoose')
const bookModel=mongoose.model("books",mongoose.Schema(
    {
        pack_id:String,
        packName:String,
        packbookDate:{type:String,required:true}
    }
))
module.exports=bookModel