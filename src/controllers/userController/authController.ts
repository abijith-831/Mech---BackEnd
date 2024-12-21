import { Request, Response } from 'express';
import { AuthService } from '../../services/user/authService';
import { HttpStatus } from "../../enums/HttpStatus";

const authService = new AuthService()


class AuthController {


    async signUp(req: Request, res: Response) {
        try {
            
            const { fullName, email, password } = req.body;
            
            const response = await authService.userSignup(
                fullName,
                email,
                password,
              );
              if (!response.success) {

                res.status(HttpStatus.BAD_REQUEST).json(response);
        
              } else {
        
                console.log("hhiiiiiiii")
        
                res.status(HttpStatus.CREATED) .json({ success: true, message: "user Registered successfully" });
                 
              }     
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }


    async verifyOtp(req: Request, res: Response){
        try {
            const data = req.body
            console.log('data',data);
            
            // const response = await authService.verifyUserOtp(data);
            
        } catch (error) {
            
        }
    }
}

export default AuthController;
