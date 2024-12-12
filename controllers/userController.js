const users =require('../models/userModel')
const jwt=require('jsonwebtoken')

// register
exports.registerController=async (req,res)=>{
    console.log("inside registerController");
   const {username,email,password}= req.body
   console.log(username,email,password);
    
   try{
    // key value same so only take one "email"
    // findone return promise use we can write await at its front 
   const existingUser = await users.findOne({email})
   if(existingUser){
    res.status(406).json("user already exist ...please login")
   }else{
    // created object stored in model but this is to be stored in mongo so use save method
    const newUser = new users({
        username,email,password,github:"",linkedin:"",profilePic:""
    })
    // save also return promise 
    await newUser.save()
    res.status(200).json(newUser)
   }
   }catch(err){
    res.status(401).json(err)
   }
 
}

// login
exports.loginController = async (req,res) => {
    console.log('Inside logincontroller')
    const { email, password } = req.body
    console.log( email, password)

    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            // login successfull here so token placed here
            const token= jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }else{
            res.status(404).json("invalid email/paswword")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// profile updation
exports.editUserController=async(req,res)=>{
    console.log("inside editUserController");
    // 1.get id of user from jwtmiddleware req.userid
    const userId=req.userId
    const {username,email,password,github,linkedin,profilePic}=req.body
    const uploadProfileImgFile=req.file?req.file.filename:profilePic
    // update-user
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profilePic:uploadProfileImgFile
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(err)
    }
}