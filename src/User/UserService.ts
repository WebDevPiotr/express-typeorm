import Database from "Database/Database";
import { Repository } from "typeorm";
import User from "User/User.entity";

class UserService {

    private static userRepository: Repository<User> = Database.getRepository(User)


    public static async findAll() {
        return await this.userRepository.find()
    }

    public static async findById(id: number) {
        return await this.userRepository.findOne(id)
    }
}

export default UserService