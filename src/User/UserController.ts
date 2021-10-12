import UserService from './UserService'
import { Get, Param } from 'routing-controllers';
import { RestAuthorizatedController } from 'Utils/ControllerDecorator';
import UserResponse from './DTO/UserResponse';
@RestAuthorizatedController('/users')
export class UserController {

  constructor(private userService: UserService) { }

  @Get('/')
  public async findAll() {
    const users =  await this.userService.findAll() 
    return users.map(user => UserResponse.fromUser(user))
  }

  @Get('/:id')
  public async findById(@Param('id') id: number) {
    const user = await this.userService.findById(id)
    return UserResponse.fromUser(user)
  }

}

export default UserController