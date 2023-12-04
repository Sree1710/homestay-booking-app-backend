const Express = require('express')
const Cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userModel = require('./userModel')
const adminModel = require('./adminModel')
const propertyModel = require('./propertyModel')
const bookModel = require('./bookModel')
const jwt = require('jsonwebtoken')

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
            jwt.sign({ username: getUsername, password: getPassword }, "hsbookapp", { expiresIn: "1d" },
                (error, token) => {
                    if (error) {
                        response.json({ "status": "Unauthorized User !!!" })
                    } else {
                        response.json({ "status": "success", "data": result[0], "token": token })
                    }
                })
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
            jwt.sign({ username: getUsername, password: getPassword }, "hsubookapp", { expiresIn: "1d" },
                (error, token) => {
                    if (error) {
                        response.json({ "status": "Unauthorized User !!!" })
                    } else {
                        response.json({ "status": "success", "data": result[0], "token": token })
                    }
                })
        } else {
            response.json({ "status": "Invalid Username or Password !!!" })
        }
    } else {
        response.json({ "status": "User Does Not Exist !!!" })
    }
})



app.post("/addpack", async (request, response) => {
    let data = request.body
    let token = request.body.token
    const pack = new propertyModel(data)
    let result = await pack.save()
    if (result.packName != "") {
        jwt.verify(token, "hsbookapp", (error, decoded) => {
            if (decoded) {
                response.json({ "status": "success" })
            } else {
                response.json({ "status": "Unauthorized User !!!" })
            }
        })
    } else {
        response.json({ "status": "error" })
    }
})



app.post("/adviewp", async (request, response) => {
    let token = request.body.token
    let result = await propertyModel.find()
    jwt.verify(token, "hsbookapp", (error, decoded) => {
        if (decoded) {
            response.json(result)
        } else {
            response.json({ "status": "Unauthorized User !!!" })
        }
    })
})



app.post("/usviewp", async (request, response) => {
    let token=request.body.token
    let data = request.body
    let result = await bookModel.find(data)
    if (result=="") {
        let pack2=await propertyModel.find()
        response.json(pack2)
    } else {
        const data2 = result[0].pack_id
        let result2 = data2 ? { _id: { $ne: data2 } } : {}
        const pack = await propertyModel.find(result2)
        jwt.verify(token,"hsubookapp",(error,decoded)=>{
            if (decoded) {
                response.json(pack)
            } else {
                response.json({"status":"Unauthorized User !!!"})
            }
        })
    }
})


app.post("/bookp", async (request, response) => {
    let data = request.body
    let token = request.body.token
    const packbook = new bookModel(data)
    let result = await packbook.save()
    if (result.packbookDate != "") {
        jwt.verify(token, "hsubookapp", (error, decoded) => {
            if (decoded) {
                response.json({ "status": "success" })
            } else {
                response.json({ "status": "Unauthorized User !!!" })
            }
        })
    } else {
        response.json({ "status": "error" })
    }
})



app.post("/adviewb", async (request, response) => {
    let token = request.body.token
    let result = await bookModel.find()
    jwt.verify(token, "hsbookapp", (error, decoded) => {
        if (decoded) {
            response.json(result)
        } else {
            response.json({ "status": "Unauthorized User !!!" })
        }
    })
})

app.post("/userviewp", async (request, response) => {
    let packid = request.body._id
    let token = request.body.token
    let result = await propertyModel.find({ "_id": packid })
    jwt.verify(token, "hsubookapp", (error, decoded) => {
        if (decoded) {
            response.json(result)
        } else {
            response.json({ "status": "Unauthorized User !!!" })
        }
    })
})




app.listen(3001, () => {
    console.log("Server Running")
})