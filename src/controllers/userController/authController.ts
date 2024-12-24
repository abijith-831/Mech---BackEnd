import User from "../../models/user/userModel";
import { Request, Response } from "express";
import { AuthService } from "../../services/user/authService";
import { HttpStatus } from "../../enums/HttpStatus";
import { log } from "console";



const authService = new AuthService();

class AuthController {

async signUp(req: Request, res: Response) {

    try {

      const { username, email, password } = req.body;

      const response = await authService.userSignup(
        username,
        email,
        password
      );

      if (!response.success) {

        res.status(HttpStatus.BAD_REQUEST).json(response);

      } else {

        res.status(HttpStatus.CREATED) .json({ success: true,
             message: "user Registered successfully",
             user: response.user
             });       
      }

    } catch (error) {

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        
    }

}



async verifyOtp(req: Request, res: Response) {

    try {

      const data = req.body;

      const response = await authService.verifyUserOtp(data);

      if (typeof response === "string") {

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: response });
          
        return

      } else if (response?.success) {

        res.status(HttpStatus.CREATED).json({ message: response });

        return

      }else{

          res.status(HttpStatus.BAD_REQUEST) .json(response);
    
          return

      }


    } catch (error: any) {

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "otp verification failed" });

      return;

    }

}



async resendOtp(req:Request,res:Response){

    const data=req.body

  try {
    
    const response =await authService.resendOtp(data)

    if (typeof response === 'string') {

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: response });

      return
   }

   if (response?.success) {

      res.status(HttpStatus.CREATED).json({message:response})

      return
   }

  } catch (error) {
    
    console.log('error in otp controller ',error)

  }

}


async login(req:Request,res:Response){

     const userData=req.body  
    try {
      const response =await authService.userLogin(userData)
    

      if(response.success){

        res.status(HttpStatus.CREATED).cookie('refreshToken',
        response.refreshToken,{httpOnly:true,secure:true,sameSite:'none',maxAge:7*24*60*1000})
        .json({success:true,
          message: response.message,
          data:{
            username:response.data?.username,
            email:response.data?.email
          },
          accessToken:response.accessToken });

      }else{

        res.status(HttpStatus.BAD_REQUEST).json(response)

      }
      
    } catch (error) {
      console.error('Error during login:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Something went wrong during login. Please try again later.',
      });
    }
      
}
  

async forgetPass(req:Request,res:Response){

    const data=req.body
  
    try {

      const response=await authService.forgetPass(data)

      console.log(response,'k')

      if (!response.success) {

        res.status(HttpStatus.BAD_REQUEST).json(response);

      } else {

        console.log("hhiiiiiiii")

        res.status(HttpStatus.CREATED) .json({response});
         
      }


      
    } catch (error) {

      console.log('error occur in forget pass',error)
      
    }

}



async resetPass(req:Request,res:Response){

    try {


      const response=await authService.resetPass(req.body)
      
      if (!response.success) {

        res.status(HttpStatus.BAD_REQUEST).json(response);

      } else {

        res.status(HttpStatus.CREATED) .json({response});
         
      }
      
    } catch (error) {
      
    }

}



async logout(req:Request,res:Response){

    try {
      console.log('control');
        
      res.clearCookie('refreshToken')

      res.json({message:'Successfully Logged Out'})

      return
      
    } catch (error) {

    console.log('error in user logout controller',error)
      
    }

}

}

export default AuthController;