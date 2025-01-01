import { AdminUserRepositories } from "../../repositories/implementation/AdminUserRepositories";
import { AdminMechRepositories } from "../../repositories/implementation/AdminMechRepositories";

const adminUserRepository = new AdminUserRepositories()
const adminMechRepository = new AdminMechRepositories()

export class AdminService{

     getallUsers = async()=>{
        try {
            
            const users = await adminUserRepository.findAll()
            
            if (users.length === 0) {
                return { message: "No users found" };  
            }

            return users
        } catch (error) {
            console.error("Error fetching users:", error);
            return { message: "An error occurred while fetching users" };
        }
    }


    getallMechanics = async()=>{
        try {
            
            const mechanics = await adminMechRepository.findAll()            
            
            if (mechanics.length === 0) {
                return { message: "No mechanics found" };  
            }

            return mechanics
        } catch (error) {
            console.error("Error fetching mechanics:", error);
            return { message: "An error occurred while fetching mechanics" };
        }
    }


    verifyMechanic = async(mechId:string)=>{
        try {
            
            const mechanic = await adminMechRepository.findMechById(mechId)

            if (!mechanic) {
                throw new Error('Mechanic not found');
            }

            mechanic.isVerified = true
            await mechanic.save()
            
            return {success:true ,  message: 'Mechanic verified successfully', mechanic };
        } catch (error) {
            console.error('Error verifying mechanic:', error);
            return {success:false ,  message: 'Failed to verify mechanic'};

        }
    }
}