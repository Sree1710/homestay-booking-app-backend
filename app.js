const Express=require('express')
const Cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const userModel = require('./userModel')
const adminModel = require('./adminModel')
const propertyModel = require('./propertyModel')

const app=Express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(Cors())

mongoose.connect("mongodb+srv://sreelekshmisl1710:Dharithri@cluster0.y83cozw.mongodb.net/homestayDB?retryWrites=true&w=majority")

app.post("/userreg",async(request,response)=>{
    let data=request.body
    const reg=new userModel(data)
    let result=await reg.save()
    if (result.Name!="") {
        response.json({"status":"success"})
    } else {
        response.json({"status":"error"})
    }
})



app.post("/adlog",async(request,response)=>{
    let data=request.body
    let getUsername=data.username
    let getPassword=data.password
    let result=await adminModel.find({username:getUsername})
    if (result.length>0) {
        if (result[0].password==getPassword) {
            response.json({"status":"success","data":result[0]})
        } else {
            response.json({"status":"Invalid Username or Password !!!"})
        }
    } else {
        response.json({"status":"User Does Not Exist !!!"})
    }
})



app.post("/userlog",async(request,response)=>{
    let data=request.body
    let getUsername=data.username
    let getPassword=data.password
    let result=await userModel.find({username:getUsername})
    if (result.length>0) {
        if (result[0].password==getPassword) {
            response.json({"status":"success","data":result[0]})
        } else {
            response.json({"status":"Invalid Username or Password !!!"})
        }
    } else {
        response.json({"status":"User Does Not Exist !!!"})
    }
})












app.listen(3001,()=>{
    console.log("Server Running")
})