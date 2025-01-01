import User , {IUser} from '../../models/user/userModel'



export class AdminUserRepositories {

    async findAll():Promise<any[]>{
        const users = User.find()

        return users
    }
}