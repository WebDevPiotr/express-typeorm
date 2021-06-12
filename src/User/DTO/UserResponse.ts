import User from "User/User";

class UserResponse {

    private _id: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;

    set id(id: number) { this._id = id }
    set firstName(firstName: string) { this._firstName = firstName }
    set lastName(lastName: string) { this._lastName = lastName }
    set email(email: string) { this._email = email }

    static fromUser(user: User){
        const response = new UserResponse()
        response.id = user.id
        response.firstName = user.firstName
        response.lastName = user.lastName
        response.email = user.email
        return response
    }
}

export default UserResponse