import JwtToken from 'Security/JwtToken'
import { UserPayloadType } from 'Security/UserPayload'
import User from 'User/User.entity'

describe('Jwt Token Test', () => {

    it('Generate token', async () => {
        expect(token).not.toBeUndefined()
    })

    it('Decode token', async () => {
        expect(JwtToken.decodeToken(token)).toMatchObject(payload)
    })

    it('Validate - correct', async () => {
        expect(JwtToken.isTokenValid(token)).toBeTruthy()
    })

    it('Validate - wrong', async () => {
        expect(JwtToken.isTokenValid('asdsadasdsadasdasd')).toBeFalsy()
    })

})


const user: User = new User()
user.id = 1
user.firstName = 'John'
user.lastName = 'Bravo'
user.email = 'john@gmail.com'
user.password = '111'


const token = JwtToken.createToken(user)

const payload: UserPayloadType = {
    id: user.id,
    email: user.email,
    fullName: `${user.firstName} ${user.lastName}`
}
