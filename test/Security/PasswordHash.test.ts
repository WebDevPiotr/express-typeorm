import PasswordHash from '../../src/Security/PasswordHash'

describe('Password Hash Test', () => {

    it('Check proper action', async () => {
        const password = "111"
        const hash = await PasswordHash.hashPassword(password)
        expect(await PasswordHash.isValidPassword(password, hash)).toBeTruthy()
    })

    it('Check invalid action ', async () => {
        const password = "111"
        const hash = await PasswordHash.hashPassword(password)
        expect(await PasswordHash.isValidPassword("2222", hash)).toBeFalsy()
    })

})