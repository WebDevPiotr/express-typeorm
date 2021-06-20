import { Service } from 'typedi';
import { RepositoryInstance } from 'Utils/RepositoryDecorator';
import { UserEntityRepository } from "./UserEntityRepository";
import User from "../User";
import UserEntity from "./User.entity";
@Service()
class UserRepository {

    constructor(@RepositoryInstance() private repository: UserEntityRepository) { }

    public async findAll(): Promise<Array<User>> {
        const users = await this.repository.find()
        return users.map(user => this.toUser(user))
    }

    public async findById(id: number): Promise<User> {
        const user = await this.repository.findOne(id)
        if (user) return this.toUser(user)
    }

    public async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email })
        if (user) return this.toUser(user)
    }

    public async save(user: User): Promise<User> {
        const newUser = await this.repository.save(this.toEntity(user))
        return this.toUser(newUser)
    }

    public async removeById(id: number): Promise<User> {
        const user = await this.repository.findOne(id)
        if (user) {
            const removedUser = await this.repository.remove(user)
            return this.toUser(removedUser)
        }
    }

    private toEntity(user: User): UserEntity {
        return UserEntity.builder()
            .setId(user.id)
            .setFirstName(user.firstName)
            .setLastName(user.lastName)
            .setEmail(user.email)
            .setPassword(user.password)
            .build()
    }

    private toUser(entity: UserEntity): User {
        return User.builder()
            .setId(entity.id)
            .setFirstName(entity.firstName)
            .setLastName(entity.lastName)
            .setEmail(entity.email)
            .setPassword(entity.password)
            .build()
    }
}

export default UserRepository