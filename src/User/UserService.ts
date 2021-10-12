import { Service } from 'typedi';
import { NotFoundError, BadRequestError } from 'routing-controllers';
import UserRepository from "./Repository/UserRepository";
import UserRequest from './DTO/UserRequest';
import User from './User';
import UserResponse from './DTO/UserResponse';
import PasswordHash from 'Security/PasswordHash';
@Service()
class UserService {

    constructor(private repository: UserRepository) { }

    public async findAll(): Promise<Array<User>> {
        const users = await this.repository.findAll()
        return users
    }

    public async findById(id: number): Promise<User> {
        const user = await this.repository.findById(id)
        if (!user) throw new NotFoundError('User not found')
        return user
    }

    public async save(userRequest: UserRequest): Promise<User> {
        if(await this.repository.findByEmail(userRequest.email)) throw new BadRequestError('User with provided email already exist')
        const user = await this.repository.save(User.fromRequest(userRequest))
        return user
    }

    public async removeById(id: number): Promise<void> {
        const removedUser = await this.repository.removeById(id)
        if (!removedUser) throw new NotFoundError('User not found')
    }
}

export default UserService