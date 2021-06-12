import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import UserEntity from './User.entity';

@Service()
@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity> {}