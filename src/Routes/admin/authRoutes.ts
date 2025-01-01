import express from 'express'

import AuthController from '../../controllers/adminController/authController'

const authController = new AuthController()

const adminAuth_route = express.Router()

adminAuth_route.post('/login',authController.adminLogin)


 
export default adminAuth_route