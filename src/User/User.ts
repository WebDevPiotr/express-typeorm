import RegisterRequest from "Security/DTO/RegisterRequest";
import UserRequest from "./DTO/UserRequest";

class User {

    private _id: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _password: string

    get id() { return this._id }
    set id(id: number) { this._id = id }

    get firstName() { return this._firstName }
    set firstName(firstName: string) { this._firstName = firstName }

    get lastName() { return this._lastName }
    set lastName(lastName: string) { this._lastName = lastName }

    get email() { return this._email }
    set email(email: string) { this._email = email }

    get password() { return this._password }
    set password(password: string) { this._password = password }

    static builder() {
        return new this.UserBuilder()
    }

    static UserBuilder = class {

        private id: number;
        private firstName: string;
        private lastName: string;
        private email: string;
        private password: string

        public setId(id: number) {
            this.id = id
            return this
        }

        public setFirstName(firstName: string) {
            this.firstName = firstName
            return this
        }

        public setLastName(lastName: string) {
            this.lastName = lastName
            return this
        }

        public setEmail(email: string) {
            this.email = email
            return this
        }

        public setPassword(password: string) {
            this.password = password
            return this
        }

        public build() {
            const user = new User()
            user.id = this.id
            user.email = this.email
            user.firstName = this.firstName
            user.lastName = this.lastName
            user.password = this.password
            return user
        }
    }

    static fromRequest(request: UserRequest) {
        return User.builder()
            .setId(request.id)
            .setFirstName(request.firstName)
            .setLastName(request.lastName)
            .setEmail(request.email)
            .build()
    }

    static fromReqisterRequest(request: RegisterRequest) {
        return User.builder()
            .setFirstName(request.firstName)
            .setLastName(request.lastName)
            .setEmail(request.email)
            .setPassword(request.password)
            .build()
    }
}

export default User