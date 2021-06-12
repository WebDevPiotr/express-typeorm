import User from "User/Repository/User.entity";
class UserPayload {

    static fromUser(user: User): UserPayloadType {
        return {
            id: user.id,
            email: user.email,
            fullName: `${user.firstName} ${user.lastName}`
        }
    }

}

export default UserPayload

export type UserPayloadType = {
    id: number,
    email: string,
    fullName: string,
}