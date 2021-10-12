import jwt from 'jsonwebtoken'
import User from 'User/User'

type UserPayload = {
    id: number,
    email: string,
    fullName: string
}
class JwtToken {

    private static readonly secret: string = process.env.JWT_SECRET

    public static createToken(user: User) {
        return jwt.sign(this.createPayload(user), this.secret, { subject: user.email, expiresIn: 60 * 60 })
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
        return jwt.decode(token) as UserPayload
    }

    private static createPayload(user: User): UserPayload{
        return {
            id: user.id,
            email:user.email,
            fullName: `${user.firstName} ${user.lastName}`,
        }
    }

}

export default JwtToken