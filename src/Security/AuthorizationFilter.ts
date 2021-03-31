import AccessDeniedException from 'Errors/exceptions/AccessDeniedException'
import { NextFunction, Request, Response } from 'express'
import JwtToken from 'Security/JwtToken'
import Database from 'Database/Database'
import User from 'User/User.entity'
import ContextRegistry from 'App/ContextRegistry'

const authorizationFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!isAuthorizationHeaderPresent(req)) throw new AccessDeniedException('No authorization header')

        if (!isTokenPrefixCorrect(req.headers.authorization)) throw new AccessDeniedException('Wrong token prefix')

        const token = getTokenFromHeader(req.headers.authorization)

        if (!isTokenValid(token)) throw new AccessDeniedException('Wrong token')

        const user = await getUserFromToken(token)

        if (!user) throw new AccessDeniedException('The token does not match any user')

        ContextRegistry.set(req, user)

        next()
    } catch (e) {
        next(e)
    }

}

export default authorizationFilter

const isAuthorizationHeaderPresent = (req: Request) => {
    return Boolean(req.headers.authorization)
}

const isTokenPrefixCorrect = (header: string) => {
    return header.split(' ')[0] === 'Bearer'
}

const isTokenValid = (token: string) => {
    return JwtToken.isTokenValid(token)
}

const getTokenFromHeader = (header: string) => {
    return header.split(' ')[1]
}

const getUserFromToken = async (token: string) => {
    const payload = JwtToken.decodeToken(token)
    return await Database.getRepository(User).findOne(payload.id)
}