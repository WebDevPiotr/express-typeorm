import bcrypt from 'bcrypt'

class PasswordHash {

    public static async hashPassword(password: string){
        return await bcrypt.hash(password, 10)
    }

    public static async isValidPassword(password: string, hashPassword: string){
        return await bcrypt.compare(password, hashPassword)
    }
}

export default PasswordHash