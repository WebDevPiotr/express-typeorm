import User from "User/Repository/User.entity";
class UserInfo {

    public readonly id: number
    public readonly email: string

    constructor(user: User) {
        this.id = user.id
        this.email = user.email
    }
}

export default UserInfo