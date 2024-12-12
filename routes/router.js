const express=require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

const router = new express.Router()

// register path - post
router.post('/register',userController.registerController)

// login-post
router.post('/login',userController.loginController)

// add-project -post
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.addProjectController)

// home-project -get
router.get('/home-project',projectController.getHomeProjectsController)

// user-project -get
router.get('/user-project',jwtMiddleware,projectController.getUserProjectsController)

// all-project -get
router.get('/all-project',jwtMiddleware,projectController.getAllProjectsController)

// edit-project
router.put('/projects/:id/edit',jwtMiddleware,multerMiddleware.single("projectImage"),projectController.editProjectController)

//// remove-project - delete
router.delete('/projects/:id/remove',jwtMiddleware,projectController.removeProjectController)

// edit user - put
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editUserController)
module.exports=router