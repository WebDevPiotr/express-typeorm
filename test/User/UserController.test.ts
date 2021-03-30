import buildApp from '../../src/app'
import Database from '../../src/Database/Database'
import User from '../../src/User/User.entity'
import JwtToken from '../../src/Security/JwtToken'
import supertest from 'supertest'

describe('User Controller Test', () => {

    let request: any

    beforeAll(async () => {
        await Database.init()
        request = supertest(buildApp())
    })

    afterAll(async () => {
        await Database.close()
    })

    afterEach(async () => {
        await Database.getRepository(User).query(`DELETE FROM users`);
    })

    it('Get users request - list of users', async () => {
        await createUsers()
        const response = await request.get("/users").set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(2)
    })

    it('Get users request - empty list', async () => {
        const response = await request.get("/users").set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(0)
    })

    it('Get user request - found', async () => {
        await createUsers()
        const response = await request.get("/users/1").set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body).not.toBeUndefined()
    })

    it('Get user request - not found', async () => {
        await createUsers()
        const response = await request.get("/users/10").set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(404)
        expect(response.body).not.toBeUndefined()
        expect(response.body.name).toBe('Not Found Error')
        expect(response.body.message).toBe('User not found')
    })

})

const createUsers = async () => {
    await Database.getRepository(User).query(
        `INSERT INTO users (id,"firstName", "lastName", email, password) VALUES
        (1, 'Jan', 'Kowalski', 'kowalski@gmail.com', '111'),
        (2, 'Mariusz', 'Nowak', 'nowak@gmail.com', '111');`
    );
}

const user: User = new User()
user.id = 1
user.firstName = 'John'
user.lastName = 'Bravo'
user.email = 'john@gmail.com'
user.password = '111'

const token = JwtToken.createToken(user)