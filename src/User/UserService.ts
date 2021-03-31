import Database from "Database/Database";
import NotFoundException from "Errors/exceptions/NotFoundException";
import User from "User/User.entity";

class UserService {

    public static async findAll() {
        return await Database.getRepository(User).find()
    }

    public static async findById(id: number) {
        const user = await Database.getRepository(User).findOne(id)
        if (!user) throw new NotFoundException('User not found')
        return user
    }
}

export default UserService