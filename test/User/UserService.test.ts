import Database from '../../src/Database/Database'
import User from '../../src/User/User.entity'
import UserService from '../../src/User/UserService'
import NotFoundException from '../../src/Errors/exceptions/NotFoundException'

describe('User Service Test', () => {

    beforeAll(async () => {
        await Database.init()
        await Database.getRepository(User).query(
            `INSERT INTO users (id, "firstName", "lastName", email, password) VALUES
            (1, 'Jan', 'Kowalski', 'kowalski@gmail.com', '111'),
            (2, 'Mariusz', 'Nowak', 'nowak@gmail.com', '111');`
        );
    })

    afterAll(async () => {
        await Database.getRepository(User).query(`DELETE FROM users`);
        await Database.close()
    })

    it('Find all', async () => {
        const users = await UserService.findAll()
        expect(users.length).toBe(2)
    })

    it('Find by id', async () => {
        const user = await UserService.findById(1)
        expect(user.id).toEqual(1)
    })

    it('Cannot find user with id', async () => {
        await expect(UserService.findById(-1))
            .rejects
            .toThrow(new NotFoundException('User not found'))
    })

})