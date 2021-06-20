import { NextFunction, Request, Response } from 'express'
import JwtToken from 'Security/JwtToken'
import ContextRegistry from 'App/ContextRegistry'
import { Service } from 'typedi'
import UserRepository from 'User/Repository/UserRepository'
import { ExpressMiddlewareInterface, ForbiddenError } from 'routing-controllers';
@Service()
export class AuthorizationFilter implements ExpressMiddlewareInterface {

    constructor(private userRepository: UserRepository) { }

    public async use(req: Request, res: Response, next?: NextFunction) {
        if (!this.isAuthorizationHeaderPresent(req)) throw new ForbiddenError('No authorization header')
        if (!this.isTokenPrefixCorrect(req.headers.authorization)) throw new ForbiddenError('Wrong token prefix')
        const token = this.getTokenFromHeader(req.headers.authorization)
        if (!this.isTokenValid(token)) throw new ForbiddenError('Wrong token')
        const user = await this.getUserFromToken(token)
        if (!user) throw new ForbiddenError('The token does not match any user')
        ContextRegistry.set(req, user)
        next()
    }

    private isAuthorizationHeaderPresent(req: Request) {
        return Boolean(req.headers.authorization)
    }

    private isTokenPrefixCorrect(header: string) {
        return header.split(' ')[0] === 'Bearer'
    }

    private isTokenValid(token: string) {
        return JwtToken.isTokenValid(token)
    }

    private getTokenFromHeader(header: string) {
        return header.split(' ')[1]
    }

    private async getUserFromToken(token: string) {
        const payload = JwtToken.decodeToken(token)
        return this.userRepository.findById(payload.id)
    }
}

export default AuthorizationFilter