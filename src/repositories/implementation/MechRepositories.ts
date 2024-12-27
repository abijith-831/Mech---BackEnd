import Mech , {IMech} from '../../models/mech/mechModel'


export class MechRepositories{

    async createMechanic(data:any):Promise <IMech | null> {
        return await Mech.create(data)
    }

    async findMechanicByEmail(email:string) :Promise <IMech | null>{
       const data = await Mech.findOne({email})
       const mechData = data?.toObject()

       return mechData as IMech
    }
}