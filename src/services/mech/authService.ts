
import { MechRepositories } from "../../repositories/implementation/MechRepositories";
import { IMech } from "../../models/mech/mechModel";
import bcrypt from 'bcryptjs'
import Mechanic from '../../models/mech/mechModel'
import { HttpStatus } from "../../enums/HttpStatus";


async function hashPassword(password:string):Promise<string> {
    return await bcrypt.hash(password,10)
}


export class AuthService{

    private mechRepositories : MechRepositories

    constructor(){
        this.mechRepositories = new MechRepositories()
    }


    async mechRegister(formData: {
        workshopname: string;
        username: string;
        email: string;
        password: string;
        phone: number;
        shopno: number;
        floor: string;
        area: string;
        city: string;
        landmark: string;
      }): Promise<{ success: boolean; message: string ; mech?:IMech }> {
        const { email, password, username, ...workshopDetails } = formData;

        try {
            
            const existing = await this.mechRepositories.findMechanicByEmail(email)

            if(existing){
                console.log('existing');
                
                return { success: false, message: "Mechanic already exists." };
            }

            const hashedPassword = await hashPassword(password)

            const newMech = new Mechanic({
                ...workshopDetails,
                username,
                email,
                password: hashedPassword,
                isVerified: false,
              });

              const savedMech = await this.mechRepositories.createMechanic(newMech);
              
              if(!savedMech){

                return { success:false, message:'Mechanic Registration failed . please try again later'}
              }


              return { success: true, message: "Registration successfull" , mech:savedMech };
        } catch (error) {
            console.error("Error during mechanic registration:", error);

            return { success: false, message: "An error occurred during registration." };
        }
    }


    async mechLogin(email:string,password:string): Promise<{ success: boolean; message: string }>{
        
        try {
            const existing = await this.mechRepositories.findMechanicByEmail(email)
            
            if(!existing){
                return {success:false,message:'Invalid Email or Password'}              
            }

            if(!existing.isVerified){
                
                return {success:false , message:'Registration not Approved yet . Please Contact admin'}
            }

            const isPasswordValid = await bcrypt.compare(password, existing.password);
            if (!isPasswordValid) {
                return { success: false, message: 'Invalid Email or Password' };
            }

            console.log('login sucess');
            
            return {success:true , message:'Login Successful'}



        } catch (error) {
            console.error("Error during mechanic login:", error);
            return { success: false, message: 'An error occurred during login.' };
        }
    }

}