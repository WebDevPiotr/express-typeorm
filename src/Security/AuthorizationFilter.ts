import AccessDeniedException from 'Errors/exceptions/AccessDeniedException'
import { NextFunction, Request, Response} from 'express'
import JwtToken from 'Security/JwtToken'

const authorizationFilter = (req: Request, res: Response, next: NextFunction) => {

    if (!isAuthorizationHeaderPresent(req)) throw new AccessDeniedException('No authorization header')

    if (!isTokenPrefixCorrect(req.headers.authorization)) throw new AccessDeniedException('Wrong token prefix')

    if (!isTokenValid(getTokenFromHeader(req.headers.authorization))) throw new AccessDeniedException('Wrong token')

    next()
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