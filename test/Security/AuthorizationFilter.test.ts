import AppFactory from '../../src/App/AppFactory'
import Database from '../../src/Database/Database'
import supertest from 'supertest'
import JwtToken from '../../src/Security/JwtToken'
import User from '../../src/User/User.entity'
import RegisterRequest from '../../src/Security/dto/RegisterRequest'

describe('Authorization Filter Test', () => {

    let request: any
    let user: User
    let token: string

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
        user = await Database.getRepository(User).save(User.fromRequest(registerBody))
        token = JwtToken.createToken(user)
    })

    afterAll(async () => {
        await Database.getRepository(User).query(`DELETE FROM users`);
        await Database.close()
    })

    it('Request insecure endpoint', async () => {
        const response = await request.post("/auth/login")
        expect(response.status).not.toBe(403)
    })

    it('Request secured endpoint', async () => {
        const response = await request.get("/users").set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })

    it('Request secured endpoint without token', async () => {
        const response = await request.get("/users")
        expect(response.status).toBe(403)
        expect(response.body.name).toBe('Access Denied Error')
        expect(response.body.message).toBe('No authorization header')
    })

    it('Request secured endpoint with wrong token prefix', async () => {
        const response = await request.get("/users").set('Authorization', `Test ${token}`)
        expect(response.status).toBe(403)
        expect(response.body.name).toBe('Access Denied Error')
        expect(response.body.message).toBe('Wrong token prefix')
    })

    it('Request secured endpoint with wrong token - not match app secret', async () => {
        const response = await request.get("/users").set('Authorization', `Bearer sadasdasdasdasdasdasdaa`)
        expect(response.status).toBe(403)
        expect(response.body.name).toBe('Access Denied Error')
        expect(response.body.message).toBe('Wrong token')
    })

    it('Request secured endpoint with wrong token - no user in database', async () => {
        const response = await request.get("/users").set('Authorization', `Bearer ${wrongToken}`)
        expect(response.status).toBe(403)
        expect(response.body.name).toBe('Access Denied Error')
        expect(response.body.message).toBe('The token does not match any user')
    })

})

const registerBody: RegisterRequest = {
    firstName: 'John',
    lastName: 'Bravo',
    email: 'john@gmail.com',
    password: '111',
    repeatPassword: '111'
}

const wrongUser: User = new User()
wrongUser.id = -1
wrongUser.firstName = 'Alex'
wrongUser.lastName = 'Bravo'
wrongUser.email = 'alex@gmail.com'
wrongUser.password = '111'

const wrongToken = JwtToken.createToken(wrongUser)