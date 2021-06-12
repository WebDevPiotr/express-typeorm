import { Router, Request, Response, NextFunction } from 'express'
import UserService from './UserService'
import UserResponse from './DTO/UserResponse'
import ContextRegistry from 'App/ContextRegistry'
import { Container } from 'typeorm-typedi-extensions';

const router: Router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: UserResponse[] = await Container.get(UserService).findAll()
        res.status(200).json(users)
    } catch (e) {
        next(e)
    }
})

router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const context = ContextRegistry.get(req)
        const user = await Container.get(UserService).findById(context.id)
        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id)
        const user = await Container.get(UserService).findById(id)
        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
})



export default router