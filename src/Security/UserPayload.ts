import User from "User/Repository/User.entity";
class UserPayload {

    public readonly id: number
    public readonly email: string
    public readonly fullName: string

    constructor(user: User) {
        this.id = user.id
        this.email = user.email
        this.fullName = `${user.firstName} ${user.lastName}`
    }

}

export default UserPayload