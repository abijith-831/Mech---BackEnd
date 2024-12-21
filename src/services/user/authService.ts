import { MailService } from "../../utils/email.utils";

import { OtpRepository } from "../../repositories/implementation/OtpRepositories";
import { UserRepositories } from "../../repositories/implementation/UserRepository";



export class AuthService {

  private userRepositories: UserRepositories;


  constructor(){
    this.userRepositories = new UserRepositories();

  }
    async userSignup(username: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
      try {

       const existingUser = await this.userRepositories.findUserByEmail(email);
       if (existingUser) {

        console.log("existed already");
  
        return { success: false, message: "user already existed" };
  
      }else{
        
        const savedDetails = await this.userRepositories.createUser({
                username : username,
                email : email,
                password : password
        })
        return {success :true , message : 'user created'}

      }
      } catch (error) {
        console.error('Error in userSignup service:', error);
        return { success: false, message: 'An error occurred during sign-up' };
      }
    }

}
  