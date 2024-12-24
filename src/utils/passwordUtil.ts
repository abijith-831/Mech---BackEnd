import bcrypt from 'bcryptjs'
export async function hashpassword(password:string):Promise<string>{

    return await bcrypt.hash(password,10)

}

export async function comparePassword(password:string,hashedpassword:string):Promise<boolean>{

    return await bcrypt.compare(password,hashedpassword)

}