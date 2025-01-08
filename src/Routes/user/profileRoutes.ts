import express from "express";
import ProfileController from "../../controllers/userController/profileController";
import upload from '../../middleware/uploadMiddleware'

const profileController = new ProfileController();

const profile_routes = express.Router();


profile_routes.post("/changeImage", upload.single("profileImage"), (req, res) =>   
  profileController.changeImage(req, res)
);
profile_routes.delete('/removeImage',profileController.removeImage)
profile_routes.patch('/changeName',profileController.changeName)
profile_routes.post('/addNumber',profileController.addNumber)
profile_routes.post('/addAddress',upload.none(),profileController.addAddress)
profile_routes.delete('/deleteAddress',upload.none(),profileController.deleteAddress)

export default profile_routes;

