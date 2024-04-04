const express = require('express')
const app = express();
const bodyParser = require('body-parser')//to parse body
const mongoose = require('mongoose')
const cors = require('cors')

const wishesRoutes= require('./api/routes/wishes')
const userRoutes= require('./api/routes/user')

mongoose.connect('mongodb+srv://denis1243qwerty:'+process.env.MONGO_ENV_PW+'@cluster0.hdl08qv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//here will be routes

app.use('/wishes',wishesRoutes)
app.use('/user',userRoutes)

//



// app.use((req,res,next)=>{//headers
//     res.header('Access-Control-Allow-Origin','*')
//     res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, Authorization")
//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH')
//         return res.status(200).json({})
//     }
//     next()

// })

app.use((req,res,next)=>{
    const error = new Error('Route is not found');
    error.status=404;
    next(error)
})//throw an error when we reach this because here is no routes 

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;