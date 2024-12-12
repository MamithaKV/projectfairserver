const mongoose = require('mongoose')

const connection_string = process.env.CONNECTIONSTRING

// conection return promise
mongoose.connect(connection_string).then((res)=>{
    console.log("mongo db atlas connected successfully with pfserver");
    
}).catch(err=>{
    console.log("connnection failed");
    console.log(err);
    
})