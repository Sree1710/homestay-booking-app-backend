const Express=require('express')
const Cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const app=Express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(Cors())

mongoose.connect("mongodb+srv://sreelekshmisl1710:Dharithri@cluster0.y83cozw.mongodb.net/homestayDB?retryWrites=true&w=majority")












app.listen(3001,()=>{
    console.log("Server Running")
})