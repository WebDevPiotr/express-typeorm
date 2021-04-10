import AppFactory from 'App/AppFactory'
import Database from 'Database/Database'
import User from 'User/User.entity'
import JwtToken from 'Security/JwtToken'
import RegisterRequest from 'Security/dto/RegisterRequest'

import supertest from 'supertest'

describe('Request Context Test', () => {

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


    it('Correct respone on endpoint /me', async () => {
        const response = await request.get("/users/me").set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body.firstName).toMatch('John')
    })

})

const registerBody: RegisterRequest = {
    firstName: 'John',
    lastName: 'Bravo',
    email: 'john@gmail.com',
    password: '111',
    repeatPassword: '111'
}