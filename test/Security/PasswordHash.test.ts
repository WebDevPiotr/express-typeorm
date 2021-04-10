import PasswordHash from 'Security/PasswordHash'

describe('Password Hash Test', () => {

    it('Password check - correct', async () => {
        const hash = await PasswordHash.hashPassword(password)
        expect(await PasswordHash.isValidPassword(password, hash)).toBeTruthy()
    })

    it('Password check - not match', async () => {
        const hash = await PasswordHash.hashPassword(password)
        expect(await PasswordHash.isValidPassword(wrongPassword, hash)).toBeFalsy()
    })

})

const password: string = "111"
const wrongPassword: string = "222"