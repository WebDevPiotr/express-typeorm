import User from "User/User.entity";

class UserContext {

    private _id: number
    private _email: string

    constructor(user: User) {
        this._id = user.id
        this._email = user.email
    }

    get id(): number { return this._id }
    get email(): string { return this._email }

}

export default UserContext