import { Request , Response } from "express";
import { AuthService } from "../../services/mech/authService";
import { HttpStatus } from "../../enums/HttpStatus";


const authService = new AuthService()

class AuthController {

    async register(req:Request , res:Response){
        try {
            
            const {...FormData} = req.body

            const response = await authService.mechRegister(FormData)
                    
            if (!response.success) {

                res.status(HttpStatus.BAD_REQUEST).json(response);
        
              } else {
        
                res.status(HttpStatus.CREATED) .json({ success: true,
                     message: "user Registered successfully",
                     mech: response.mech
                     });       
              }

        } catch (error) {
            console.error("Error in registration:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              success: false,
              message: "An error occurred during registration.",
            });
        }
    }


    async login(req:Request,res:Response){
      try {
        const {email,password} = req.body

        const response = await authService.mechLogin(email,password)

        if (!response.success) {
          res.status(HttpStatus.BAD_REQUEST).json(response); 
        } else {
  
        res.status(HttpStatus.CREATED) .json({ success: true,
               message: "user Registered successfully",
               });       
        }
        
      } catch (error) {
        
      }
    }
}


export default AuthController