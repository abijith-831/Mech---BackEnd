
import { MechRepositories } from "../../repositories/implementation/MechRepositories";

export class AuthService{

    private mechRepositories : MechRepositories

    constructor(){
        this.mechRepositories = new MechRepositories()
    }


    async mechRegister(FormData:any):Promise<{success:boolean;message:string;}>
}
