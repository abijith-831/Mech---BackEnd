import express from "express"

import AuthController from "../../controllers/userController/authController"

const userAuth_route=express.Router()

const authController=new AuthController()

userAuth_route.post('/signup',authController.signUp)

userAuth_route.post("/verifyOtp", authController.verifyOtp);

userAuth_route.post('/resendotp',authController.resendOtp)

userAuth_route.post('/login',authController.login)

userAuth_route.post('/forgetpass',authController.forgetPass)

userAuth_route.post('/resetPass',authController.resetPass)

userAuth_route.get('/logout',authController.logout)

export default userAuth_route