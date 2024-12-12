// loads .env file contents into process.env default
// 1a
require('dotenv').config()
// 1b 
const express = require('express')
// 1c
const cors =require('cors')
const router =require('./routes/router')
require('./config/connection')
// 2
const pfServer = express()

// 3
pfServer.use(cors())

// 4
pfServer.use(express.json())

pfServer.use(router)

// image static to internet
pfServer.use('/uploads',express.static('./uploads'))

// 5
const PORT = 3000 || process.env.PORT

// 6
pfServer.listen(PORT,()=>{
 console.log(`project fair server started at port : ${PORT} and  waiting for client request!!!`);
 
})

// 7
//http://localhost:3000/ - get
pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">project fair server started at port : ${PORT} and  waiting for client request!!</h1>`)
})

// //http://localhost:3000/ - post
// pfServer.post('/',(req,res)=>{
//     res.status(200).send("post req")
// })