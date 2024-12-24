import { UserRepositories } from "../../repositories/implementation/UserRepository";
import { OtpRepository } from "../../repositories/implementation/OtpRepositories";
import { MailService } from "../../utils/email.utils";
import bcrypt from "bcryptjs";
import { IOtp } from "../../models/user/otpModel";
import { generateAcessToken, generateRefreshToken } from "../../utils/token.util";
import { IUser } from "../../models/user/userModel";


const mailService = new MailService();

export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(otp, "this is the otp generator");
  return otp;
};

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

interface userData {

   username: string,email: string,

}

export class AuthService {
  

  private userRepositories: UserRepositories;

  private otpRepositories: OtpRepository;

  constructor() {

    this.userRepositories = new UserRepositories();
    this.otpRepositories = new OtpRepository();

  }

async userSignup(username: string,email: string,password: string): Promise<{ success: boolean; message: string; user?: { id: any; username: string; email: string } }> {
    const existingUser = await this.userRepositories.findUserByEmail(email);

    if (existingUser && existingUser.isVerified) {
      return { success: false, message: "user already existed" };
    }

    if (existingUser && !existingUser.isVerified) {
      const getOtp = await this.otpRepositories.findOtpByEmail(email);
      if (getOtp) {
        const currentTime = new Date().getTime();
        const expirationTime =new Date(getOtp.createdAt).getTime() + 5 * 60 * 1000;

        if (currentTime < expirationTime) {
          return {success: false,message: "OTP is still valid. Please verify using the same OTP." };
        } else {
          const newOtp = generateOtp()

          await this.otpRepositories.updateOtpByEmail(email, newOtp);

          await mailService.sendOtpEmail(email, newOtp);

          return {success: false, message: "OTP expired. A new OTP has been sent to your email." };
        }
      } else {
        const newOtp = generateOtp();

        await this.otpRepositories.create({email,otp: newOtp,} as unknown as IOtp)

        await mailService.sendOtpEmail(email, newOtp);

        return {success: false,message: "No OTP found. A new OTP has been sent to your email." }

      }

    }

    const hashedPassword = await hashPassword(password);

    const savedDetails = await this.userRepositories.createUser({
      username: username,
      email: email,
      password: hashedPassword,
    })

    if (!savedDetails) {
      return {
        success: false,
        message: "User registration failed. Please try again later.",
      };
    }
    const newOtp = generateOtp();
    console.log(newOtp);
    await this.otpRepositories.createOtp({  email, otp: newOtp,} as unknown as IOtp)
    await mailService.sendOtpEmail(email, newOtp);

    return {
      success: true,
      message: "User created successfully",
      user: {
        id: savedDetails.id,
        username: savedDetails.username,
        email: savedDetails.email,
      },
    };

}



async verifyUserOtp(otpdata: {email: string;otpData: string;}): Promise<{ success: boolean; message: string }> {
    const { email, otpData } = otpdata;
    console.log('emm',email);
    console.log('emm',otpData);
    
    const validUser = await this.userRepositories.findUserByEmail(email);

    if (!validUser) {
      return { success: false, message: "this email is not registered" };
    }

    const currentOtp = await this.otpRepositories.findOtpByEmail(email);

    if (!currentOtp?.otp) return { success: false, message: "resend the otp" };

    if (currentOtp.otp == otpData) {
      

      await this.userRepositories.verifyUser(email, true);

      await this.otpRepositories.deleteOtpByEmail(email);

      return { success: true, message: "User Signed Up Successfully ...!" };

    } else {

      return { success: false, message: "please enter valid otp" }

    }

}



async resendOtp(resendOtpdata:{email:string}){
    const email=resendOtpdata.email
    const otp=generateOtp()
    try {

      const existingEmail=await this.otpRepositories.findOtpByEmail(email)

      if(existingEmail){

       await this.otpRepositories.updateOtpByEmail(email,otp)

      }
      else{

        await this.otpRepositories.create({email,otp} as IOtp)

      }

      await mailService.sendOtpEmail(email,otp)

      return {success:true,message:'new Otp is sended'}     
    } catch (error) {

      return {success:false,message:'failed to resend otp'}
      
    }

  }

  

async userLogin(userData:{email:string,password:string}):Promise<{success:boolean,message:string,data?:userData,accessToken?:string,refreshToken?:string}>{
    
    const {email,password}=userData 

    const existingUser=await this.userRepositories.findUserByEmail(email) 

    if(!existingUser ){

     return {success:false,message:'invalid email or Password'}
    
    }

    const  validPassword=await bcrypt.compare(password,existingUser.password) 

    if(!validPassword){

      return {success:false,message:'Invalid Email or Password'}

    }

    if(existingUser && existingUser.isBlocked ){
      return {success:false,message:'the user is blocked'}
    }

    const userdata : userData = {  
      username:existingUser.username,
      email:existingUser.email
    }

    const { ...data} = existingUser;

    const accessToken= await generateAcessToken(data as IUser)

    const refreshToken=await generateRefreshToken(existingUser)

    return {success:true,message:'Login Successful...!',data:userdata,accessToken,refreshToken}

}


async forgetPass(forgetPass:{email:string}){

    const email=forgetPass.email

    try {

      const existing=await this.userRepositories.findUserByEmail(email)

      if(!existing){

        return {success:false,message:'Please enter a valid email'}

      }

      const otp=generateOtp()

      await this.otpRepositories.create({email,otp} as IOtp)

      await mailService.sendOtpEmail(email,otp)

      return {success:true,message:'Otp sended to registered mail'}
      
    } catch (error) {

      return {success:false,message:'failed to send otp '}
      
    }

}


async resetPass(resetPass: { newPass: string, email: string }): Promise<{ success: boolean, message: string }> {
  const { newPass, email } = resetPass;

  try {
    const existingUser: IUser | null = await this.userRepositories.findUserByEmail(email);

    if (!existingUser) {
      return { success: false, message: "User not found" };
    }

    const isSamePassword = await bcrypt.compare(newPass, existingUser.password);
    if (isSamePassword) {
      return { success: false, message: "New password cannot be the same as the old password" };
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);
    const changedPass = await this.userRepositories.UpdatePassword(email, 'password', hashedPassword);

    if (!changedPass) {
      return { success: false, message: "Failed to update the password" };
    }

    return { success: true, message: "Password successfully changed" };
    
  } catch (error) {
    console.error('Reset password error:', error);
    return { success: false, message: 'Something went wrong' };
  }
}
  
}