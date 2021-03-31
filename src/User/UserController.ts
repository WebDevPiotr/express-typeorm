import { Router, Request, Response, NextFunction } from 'express'
import UserService from './UserService'
import User from './User.entity'
import ContextRegistry from 'App/ContextRegistry'

const router: Router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: User[] = await UserService.findAll()
        res.status(200).json(users)
    } catch (e) {
        next(e)
    }
})

router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const context = ContextRegistry.get(req)
        const user = await UserService.findById(context.id)
        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id: number = Number(req.params.id)
        const user = await UserService.findById(id)
        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
})



export default router