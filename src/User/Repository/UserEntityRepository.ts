import { Repository } from 'typeorm';
import { EntityRepository } from 'Utils/RepositoryDecorator';
import UserEntity from './User.entity';
@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity> { }