import Database from "Database/Database";
import BadRequestException from "Errors/exceptions/BadRequestException";
import UnauthorizedException from "Errors/exceptions/UnauthorizedException";
import JwtToken from "./JwtToken";
import PasswordHash from "./PasswordHash";
import LoginRequest from 'Security/dto/LoginRequest'
import RegisterRequest from 'Security/dto/RegisterRequest'
import User from "User/User.entity";

class AuthService {

    public static async handleLoginRequest(body: LoginRequest) {
        
        const user: User = await Database.getRepository(User).findOne({ email: body.email })

        if (!user) throw new UnauthorizedException('Wrong email')

        if (!await PasswordHash.isValidPassword(body.password, user.password)) throw new UnauthorizedException('Wrong password')

        return JwtToken.createToken(user)

    }

    public static async handleRegisterRequest(body: RegisterRequest) {

        if (body.password !== body.repeatPassword) throw new BadRequestException('Passwords must be the same')

        if (await Database.getRepository(User).findOne({ email: body.email })) throw new BadRequestException('User with provided email already exist')

        const user = await Database.getRepository(User).save(User.fromRequest(body))

        return JwtToken.createToken(user)

    }
}

export default AuthService

