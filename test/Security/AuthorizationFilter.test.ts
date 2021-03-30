import buildApp from '../../src/app'
import Database from '../../src/Database/Database'
import LoginRequest from '../../src/Security/dto/LoginRequest'
import supertest from 'supertest'
import JwtToken from '../../src/Security/JwtToken'
import User from '../../src/User/User.entity'

describe('Authorization Filter Test', () => {

    let request: any

    beforeAll(async () => {
        await Database.init()
        request = supertest(buildApp())
    })

    afterAll(async () => {
        await Database.close()
    })

    it('Request insecure endpoint', async () => {
        const response = await request.post("/auth/login")
        expect(response.status).not.toBe(403)
    })

    it('Request secured endpoint', async () => {
        const response = await request
            .get("/users")
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })

    it('Request secured endpoint without token', async () => {
        const response = await request.get("/users")
        expect(response.status).toBe(403)
        expect(response.body.name).toBe('Access Denied Error')
        expect(response.body.message).toBe('No authorization header')
    })

    it('Request secured endpoint with wrong token prefix', async () => {
        const response = await request
            .get("/users")
            .set('Authorization', `Test ${token}`)
        expect(response.status).toBe(403)
        expect(response.body.name).toBe('Access Denied Error')
        expect(response.body.message).toBe('Wrong token prefix')
    })

    it('Request secured endpoint with wrong token prefix', async () => {
        const response = await request
            .get("/users")
            .set('Authorization', `Bearer sadasdasdasdasdasdasdaa`)
        expect(response.status).toBe(403)
        expect(response.body.name).toBe('Access Denied Error')
        expect(response.body.message).toBe('Wrong token')
    })

})

const user: User = new User()
user.id = 1
user.firstName = 'Piotr'
user.lastName = 'Stolarczyk'
user.email = 'piotr@immotef.com'
user.password = '111'

const token = JwtToken.createToken(user)

const loginBody: LoginRequest = {
    email: 'piotr@immotef.com',
    password: '111',
}