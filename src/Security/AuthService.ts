import { BadRequestError, UnauthorizedError } from "routing-controllers";
import JwtToken from "./JwtToken";
import PasswordHash from "./PasswordHash";
import LoginRequest from 'Security/DTO/LoginRequest'
import RegisterRequest from 'Security/DTO/RegisterRequest'
import User from "User/User";
import { Service } from "typedi";
import UserRepository from "User/Repository/UserRepository";
@Service()
class AuthService {

    constructor(private userRepository: UserRepository) { }

    public async handleLoginRequest(body: LoginRequest) {
        const user: User = await this.userRepository.findByEmail(body.email)
        if (!user) throw new UnauthorizedError('Wrong email')
        if (!await PasswordHash.isValidPassword(body.password, user.password)) throw new UnauthorizedError('Wrong password')
        return JwtToken.createToken(user)
    }

    public async handleRegisterRequest(body: RegisterRequest) {
        if (body.password !== body.repeatPassword) throw new BadRequestError('Passwords must be the same')
        if (await this.userRepository.findByEmail(body.email)) throw new BadRequestError('User with provided email already exist')
        const user = await this.userRepository.save(User.fromReqisterRequest(body))
        return JwtToken.createToken(user)
    }
}

export default AuthService