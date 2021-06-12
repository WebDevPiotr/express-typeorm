import jwt from 'jsonwebtoken'
import User from 'User/Repository/User.entity'
import UserPayload, { UserPayloadType } from './UserPayload'
class JwtToken {

    private static readonly secret: string = process.env.JWT_SECRET

    public static createToken(user: User) {
        return jwt.sign(UserPayload.fromUser(user), this.secret, { subject: user.email, expiresIn: 60 * 60 })
    }

    public static isTokenValid(token: string) {
        let isValid = true
        try {
            jwt.verify(token, this.secret)
        } catch (e) {
            isValid = false
        }
        return isValid
    }

    public static decodeToken(token: string) {
        return jwt.decode(token) as UserPayloadType
    }

}

export default JwtToken