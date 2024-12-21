import User , {IUser} from '../../models/user/userModel'

export class UserRepositories{

    async createUser(data:any):Promise<IUser | null> {
        return await User.create(data)
    }

    async findUserByEmail(email:String) :Promise <IUser | null>{

        const data = await User.findOne({email})
        const userdata = data?.toObject()

        console.log('rhr',userdata);
        
        return userdata as IUser
    }
}