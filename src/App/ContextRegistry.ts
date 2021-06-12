import { Request } from 'express';
import User from 'User/Repository/User.entity'
import UserContext from './UserContext'

class ContextRegistry {

    static container = new WeakMap<Request, UserContext>();

    static set(req: Request, user: User): void {
        ContextRegistry.container.set(req, new UserContext(user));
    }

    static get(req: Request): UserContext | null {
        return ContextRegistry.container.get(req) || null;
    }
}

export default ContextRegistry