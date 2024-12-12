const projects = require('../models/projectModel')

// add project
exports.addProjectController = async (req,res)=>{
    console.log("inside addProjectController");
const userId = req.userId 
// console.log(userId);
// console.log(req.body);
// console.log(req.file);
const {title,languages,overview,github,website}=req.body
const projectImage = req.file.filename
try{
    const existingProject = await projects.findOne({github})
    if(existingProject){
        res.status(406).json("project already exists...")
    }else{
        const newProject = new projects({
            title,languages,overview,github,website,projectImage,userId

        })
        await newProject.save()
        res.status(200).json(newProject)
    }
}catch(err){
    res.status(401).json(err)
}

}

// get home projects - guest user
exports.getHomeProjectsController = async(req,res)=>{
    console.log("inside getHomeProjectsController");
    try{
     const allHomeProjects = await projects.find().limit(3)
     res.status(200).json(allHomeProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// get user projects - Authorise user
exports.getUserProjectsController = async(req,res)=>{
    console.log("inside getUserProjectsController");
    const userId = req.userId
    try{
     const allUserProjects = await projects.find({userId})
     res.status(200).json(allUserProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// get all projects - Authorise user
exports.getAllProjectsController = async(req,res)=>{
    console.log("inside getAllProjectsController");
    // to get query parameter from url use req.query
   const searchKey=req.query.search
   const query={
    languages:{
        $regex:searchKey,$options:"i"
    }
   }
    try{
     const allProjects = await projects.find(query)
     res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// edit project
exports.editProjectController=async(req,res)=>{
    console.log("inside editProjectController ");
    // get project id from request params
    const {id}=req.params
    const {title,languages,overview,github,website,projectImage}=req.body
    // to get file data
    const reUploadImageFileName=req.file?req.file.filename:projectImage
    // to get userId - use jwt middleware
    const userId=req.userId
    console.log(id,title,languages,overview,github,website,reUploadImageFileName,userId);
    try{
        const updatedProject = await projects.findByIdAndUpdate({_id:id},{
            title,languages,overview,github,website,projectImage:reUploadImageFileName,userId
        },{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }catch(err){
        res.status(401).json(err)
        
    }
    
}

// remove project
exports.removeProjectController = async (req,res)=>{
    console.log("inside removeProjectController");
    // 1.get id of the project to be deleted from req params
    const {id}=req.params
    // 2.delete project with given id from model
    try{
        const removeProject=await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    }catch(err){
        res.status(401).json(err)
    }
    
}