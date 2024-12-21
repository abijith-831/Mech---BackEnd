import express from 'express'

import AuthController from '../../controllers/userController/authController'

const userAuth_route = express.Router()


const authController = new AuthController()

userAuth_route.post('/signUp',authController.signUp)
userAuth_route.post('/verifyOtp',authController.verifyOtp)

export default userAuth_route