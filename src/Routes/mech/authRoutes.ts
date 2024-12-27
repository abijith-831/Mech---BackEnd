import express from 'express'

import AuthController from '../../controllers/mechController/authController'

const mechAuth_route = express.Router()

const authController = new AuthController()

mechAuth_route.post('/register',authController.register)

export default mechAuth_route