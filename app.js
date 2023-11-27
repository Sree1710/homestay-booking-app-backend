const Express = require('express')
const Cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userModel = require('./userModel')
const adminModel = require('./adminModel')
const propertyModel = require('./propertyModel')
const bookModel = require('./bookModel')

const app = Express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(Cors())

mongoose.connect("mongodb+srv://sreelekshmisl1710:Dharithri@cluster0.y83cozw.mongodb.net/homestayDB?retryWrites=true&w=majority")

app.post("/userreg", async (request, response) => {
    let data = request.body
    const reg = new userModel(data)
    let result = await reg.save()
    if (result.Name != "") {
        response.json({ "status": "success" })
    } else {
        response.json({ "status": "error" })
    }
})



app.post("/adlog", async (request, response) => {
    let data = request.body
    let getUsername = data.username
    let getPassword = data.password
    let result = await adminModel.find({ username: getUsername })
    if (result.length > 0) {
        if (result[0].password == getPassword) {
            response.json({ "status": "success", "data": result[0] })
        } else {
            response.json({ "status": "Invalid Username or Password !!!" })
        }
    } else {
        response.json({ "status": "User Does Not Exist !!!" })
    }
})



app.post("/userlog", async (request, response) => {
    let data = request.body
    let getUsername = data.username
    let getPassword = data.password
    let result = await userModel.find({ username: getUsername })
    if (result.length > 0) {
        if (result[0].password == getPassword) {
            response.json({ "status": "success", "data": result[0] })
        } else {
            response.json({ "status": "Invalid Username or Password !!!" })
        }
    } else {
        response.json({ "status": "User Does Not Exist !!!" })
    }
})



app.post("/addpack", async (request, response) => {
    let data = request.body
    const pack = new propertyModel(data)
    let result = await pack.save()
    if (result.packName != "") {
        response.json({ "status": "success" })
    } else {
        response.json({ "status": "error" })
    }
})



app.post("/adviewp", async (request, response) => {
    let result = await propertyModel.find()
    response.json(result)
})



app.post("/usviewp", async (request, response) => {
    let data = request.body
    let result = await bookModel.find(data)
    if (result=="") {
        let pack2=await propertyModel.find()
        response.json(pack2)
    } else {
        const data2 = result[0].pack_id
        let result2 = data2 ? { _id: { $ne: data2 } } : {}
        const pack = await propertyModel.find(result2)
        response.json(pack)
    }
})










app.listen(3001, () => {
    console.log("Server Running")
})