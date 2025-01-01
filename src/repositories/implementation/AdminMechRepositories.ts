import Mechanic , {IMech} from '../../models/mech/mechModel'

export class AdminMechRepositories {

    async findAll():Promise<any[]>{
        const mechanics = Mechanic.find()

        return mechanics
    }

    async findMechById(mechId:string):Promise<IMech|null>{
        const mechanic = Mechanic.findById(mechId)

        return mechanic
    }
}