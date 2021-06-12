import bcrypt from 'bcrypt'

class PasswordHash {

    public static hashPassword(password: string){
        return bcrypt.hashSync(password, 10)
    }

    public static async isValidPassword(password: string, hashPassword: string){
        return await bcrypt.compare(password, hashPassword)
    }
}

export default PasswordHash