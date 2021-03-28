import jwt from 'jsonwebtoken'
import User from 'User/User.entity'

class JwtToken {

    private static readonly secret: string = process.env.JWT_SECRET

    public static createToken(user: User) {
        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`
            },
            this.secret,
            {
                subject: user.email,
                expiresIn: 60 * 60
            }
        )
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
        return jwt.verify(token, this.secret)
    }

}

export default JwtToken