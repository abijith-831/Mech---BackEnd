import { Request , Response } from "express";
import { AuthService } from "../../services/mech/authService";


const authService = new AuthService()

class AuthController {
    async register(req:Request , res:Response){
        try {
            console.log('bakcend');
            
            const {...FormData} = req.body

            const response = await authService.mechRegister(FormData)
            
        } catch (error) {
            
        }
    }
}


export default AuthController