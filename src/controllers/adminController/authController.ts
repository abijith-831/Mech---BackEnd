import { Request, Response } from "express";
import { AuthService } from "../../services/admin/authServices";
import { HttpStatus } from "../../enums/HttpStatus";

const authService = new AuthService();

class AuthController {

  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const response = await authService.adminLogin(email, password);

        
      if (response.success) {
        res.status(HttpStatus.OK).json({ success: true, message: response.message });
      } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: response.message });
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "An error occurred during login" });
    }
  }



  
}


export default AuthController;
