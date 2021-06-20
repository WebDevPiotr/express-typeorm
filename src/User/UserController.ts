import UserService from './UserService'
import { Get, Param } from 'routing-controllers';
import { RestAuthorizatedController } from 'Utils/ControllerDecorator';
@RestAuthorizatedController('/users')
export class UserController {

  constructor(private userService: UserService) { }

  @Get('/')
  public findAll() {
    return this.userService.findAll()
  }

  @Get('/:id')
  public getOne(@Param('id') id: number) {
    return this.userService.findById(id);
  }

}

export default UserController