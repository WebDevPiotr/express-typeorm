import { Body, HttpCode, Post } from 'routing-controllers';
import { RestController } from 'Utils/ControllerDecorator';
import AuthService from './AuthService'
import LoginRequest from './DTO/LoginRequest';
import RegisterRequest from './DTO/RegisterRequest';
@RestController('/auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    public login(@Body() request: LoginRequest) {
        return this.authService.handleLoginRequest(request)
    }

    @HttpCode(201)
    @Post('/register')
    public reqister(@Body() request: RegisterRequest) {
        return this.authService.handleRegisterRequest(request);
    }

}

export default AuthController

