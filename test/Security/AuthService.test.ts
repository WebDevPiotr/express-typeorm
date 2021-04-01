import Database from '../../src/Database/Database'
import User from '../../src/User/User.entity'
import RegisterRequest from '../../src/Security/dto/RegisterRequest'
import LoginRequest from '../../src/Security/dto/LoginRequest'
import AuthService from '../../src/Security/AuthService'
import UnauthorizedException from '../../src/Errors/exceptions/UnauthorizedException'
import BadRequestException from '../../src/Errors/exceptions/BadRequestException'

describe('Auth Service Test', () => {

    beforeAll(async () => {
        await Database.init({
            type: "postgres",
            host: "localhost",
            port: process.env.testDbPort,
            username: "postgres",
            password: "postgres",
            database: "test",
            synchronize: true,
            entities: ["src/**/*.entity.ts"],
        })
    })

    afterAll(async () => {
        await Database.close()
    })

    afterEach(async () => {
        await Database.getRepository(User).query(`DELETE FROM users`);
    })

    it('HandleLoginRequest - correct', async () => {
        await createUser()
        const token = await AuthService.handleLoginRequest(loginBody)
        expect(token).toMatch(tokenExpression)
    })

    it('HandleLoginRequest - wrong email', async () => {
        await createUser()
        await expect(AuthService.handleLoginRequest(wrongEmailLoginBody))
            .rejects
            .toThrow(new UnauthorizedException('Wrong email'))
    })

    it('HandleLoginRequest - wrong password', async () => {
        await createUser()
        await expect(AuthService.handleLoginRequest(wrongPasswordLoginBody))
            .rejects
            .toThrow(new UnauthorizedException('Wrong password'))
    })

    it('HandleRegisterRequest - correct', async () => {
        const token = await AuthService.handleRegisterRequest(registerBody)
        expect(token).toMatch(tokenExpression)
    })

    it('HandleRegisterRequest - different password', async () => {
        await expect(AuthService.handleRegisterRequest(differentPasswordsRegisterBody))
            .rejects
            .toThrow(new BadRequestException('Passwords must be the same'))
    })

    it('Test user already exist register request', async () => {
        await createUser()
        await expect(AuthService.handleRegisterRequest(registerBody))
            .rejects
            .toThrow(new BadRequestException('User with provided email already exist'))
    })

})

const createUser = async () => {
    await Database.getRepository(User).save(User.fromRequest(registerBody))
}

const tokenExpression = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

const loginBody: LoginRequest = {
    email: 'john@gmail.com',
    password: '111',
}

const wrongEmailLoginBody: LoginRequest = {
    email: 'johny@gmail.com',
    password: '111',
}

const wrongPasswordLoginBody: LoginRequest = {
    email: 'john@gmail.com',
    password: '1111',
}

const registerBody: RegisterRequest = {
    firstName: 'John',
    lastName: 'Bravo',
    email: 'john@gmail.com',
    password: '111',
    repeatPassword: '111'
}

const differentPasswordsRegisterBody: RegisterRequest = {
    firstName: 'John',
    lastName: 'Bravo',
    email: 'john@gmail.com',
    password: '111',
    repeatPassword: '1111'
}