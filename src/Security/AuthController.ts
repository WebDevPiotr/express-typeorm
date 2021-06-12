import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typeorm-typedi-extensions';
import AuthService from './AuthService'

const router: Router = Router()

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await Container.get(AuthService).handleLoginRequest(req.body)
        res.setHeader('Authorization', `Bearer ${token}`)
        res.status(200).send()
    } catch (e) {
        next(e)
    }
})

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await Container.get(AuthService).handleRegisterRequest(req.body)
        res.setHeader('Authorization', `Bearer ${token}`)
        res.status(201).send()
    } catch (e) {
        next(e)
    }
})

export default router

