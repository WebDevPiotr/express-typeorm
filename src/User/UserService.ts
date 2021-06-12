import { Service } from 'typedi';
import NotFoundException from "Errors/exceptions/NotFoundException";
import UserRepository from "./Repository/UserRepository";
import UserRequest from './DTO/UserRequest';
import User from './User';
import UserResponse from './DTO/UserResponse';
import BadRequestException from 'Errors/exceptions/BadRequestException';
@Service()
class UserService {

    constructor(private repository: UserRepository) { }

    public async findAll(): Promise<Array<UserResponse>> {
        const users = await this.repository.findAll()
        return users.map(user => UserResponse.fromUser(user))
    }

    public async findById(id: number): Promise<UserResponse> {
        const user = await this.repository.findById(id)
        if (!user) throw new NotFoundException('User not found')
        return UserResponse.fromUser(user)
    }

    public async save(userRequest: UserRequest): Promise<UserResponse> {
        const user = await this.repository.findByEmail(userRequest.email)
        if(user) throw new BadRequestException('User with provided email already exist')
        const newUser = await this.repository.save(User.fromRequest(userRequest))
        return UserResponse.fromUser(newUser)
    }

    public async removeById(id: number): Promise<void> {
        const removedUser = await this.repository.removeById(id)
        if (!removedUser) throw new NotFoundException('User not found')
    }
}

export default UserService