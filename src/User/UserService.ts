import Database from "Database/Database";
import User from "User/User.entity";

class UserService {

    public static async findAll() {
        return await Database.getRepository(User).find()
    }

    public static async findById(id: number) {
        return await Database.getRepository(User).findOne(id)
    }
}

export default UserService