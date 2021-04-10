import AppFactory from 'App/AppFactory'
import Database from 'Database/Database'
import User from 'User/User.entity'
import RegisterRequest from 'Security/dto/RegisterRequest'
import LoginRequest from 'Security/dto/LoginRequest'

import supertest from 'supertest'

describe('Auth Controller Test', () => {

    let request: any

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
        request = supertest(AppFactory.get())
    })

    afterAll(async () => {
        await Database.close()
    })

    afterEach(async () => {
        await Database.getRepository(User).query(`DELETE FROM users`);
    })

    it('Login request - correct', async () => {
        await createUser()
        const response = await request.post("/auth/login").send(loginBody)
        expect(response.status).toBe(200)
        expect(response.headers.authorization).toMatch(tokenExpression)
    })

    it('Login request - wrong email', async () => {
        await createUser()
        const response = await request.post("/auth/login").send(wrongEmailLoginBody)
        expect(response.status).toBe(401)
        expect(response.body.name).toBe('Unauthorized Error')
        expect(response.body.message).toBe('Wrong email')
        expect(response.headers.authorization).toBeUndefined()
    })

    it('Login request - wrong password', async () => {
        await createUser()
        const response = await request.post("/auth/login").send(wrongPasswordLoginBody)
        expect(response.status).toBe(401)
        expect(response.body.name).toBe('Unauthorized Error')
        expect(response.body.message).toBe('Wrong password')
        expect(response.headers.authorization).toBeUndefined()
    })

    it('Register request - correct', async () => {
        const response = await request.post("/auth/register").send(registerBody)
        expect(response.status).toBe(201)
        expect(response.headers.authorization).toMatch(tokenExpression)
    })

    it('Register request - different password', async () => {
        const response = await request.post("/auth/register").send(differentPasswordsRegisterBody)
        expect(response.status).toBe(400)
        expect(response.body.name).toBe('Bad Request Error')
        expect(response.body.message).toBe('Passwords must be the same')
        expect(response.headers.authorization).toBeUndefined()
    })

    it('Register request - user already exist', async () => {
        await createUser()
        const response = await request.post("/auth/register").send(registerBody)
        expect(response.status).toBe(400)
        expect(response.body.name).toBe('Bad Request Error')
        expect(response.body.message).toBe('User with provided email already exist')
        expect(response.headers.authorization).toBeUndefined()
    })

})

const createUser = async () => {
    await Database.getRepository(User).save(User.fromRequest(registerBody))
}

const tokenExpression = /^Bearer\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

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