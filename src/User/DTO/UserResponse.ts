import User from "User/User";

class UserResponse {

    private id: number;
    private firstName: string;
    private lastName: string;
    private email: string;

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