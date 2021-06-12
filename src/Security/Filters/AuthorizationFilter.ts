import AccessDeniedException from 'Errors/exceptions/AccessDeniedException'
import { NextFunction, Request, Response } from 'express'
import JwtToken from 'Security/JwtToken'
import ContextRegistry from 'App/ContextRegistry'
import Filter from './Filter'
import { getCustomRepository } from 'typeorm'
import { UserEntityRepository } from 'User/Repository/UserEntityRepository'

class AuthorizationFilter implements Filter {

    constructor(){
        this.filter = this.filter.bind(this)
    }

    public async filter(req: Request, res: Response, next: NextFunction) {
        try {
            if (!this.isAuthorizationHeaderPresent(req)) throw new AccessDeniedException('No authorization header')
            if (!this.isTokenPrefixCorrect(req.headers.authorization)) throw new AccessDeniedException('Wrong token prefix')
            const token = this.getTokenFromHeader(req.headers.authorization)
            if (!this.isTokenValid(token)) throw new AccessDeniedException('Wrong token')
            const user = await this.getUserFromToken(token)
            if (!user) throw new AccessDeniedException('The token does not match any user')
            ContextRegistry.set(req, user)
            next()
        } catch (e) {
            next(e)
        }
    }

    private isAuthorizationHeaderPresent(req: Request){
        return Boolean(req.headers.authorization)
    }
    
    private isTokenPrefixCorrect(header: string){
        return header.split(' ')[0] === 'Bearer'
    }
    
    private isTokenValid(token: string){
        return JwtToken.isTokenValid(token)
    }
    
    private getTokenFromHeader(header: string){
        return header.split(' ')[1]
    }
    
    private async getUserFromToken(token: string){
        const payload = JwtToken.decodeToken(token)
        return await getCustomRepository(UserEntityRepository).findOne(payload.id)
    }

}

export default AuthorizationFilter