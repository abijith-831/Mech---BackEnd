import express from 'express'
import AdminController from '../../controllers/adminController/adminController'

const admin_routes = express.Router()
const adminController = new AdminController()

admin_routes.get('/getUsers', adminController.getUserList);
admin_routes.get('/getMechs', adminController.getMechanicList);
admin_routes.patch('/verifyMech', adminController.verifyMechanic);


export default admin_routes