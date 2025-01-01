import dotenv from 'dotenv'
dotenv.config()

export class AuthService{

    async adminLogin(email:string , password:string):Promise<{success:boolean , message:string}>{
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
            return { success: true, message: 'Login successful' };
        } else {
            return { success: false, message: 'Invalid credentials' };
        }
    }


}