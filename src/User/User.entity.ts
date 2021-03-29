import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import RegisterRequest from 'Security/dto/RegisterRequest'
import PasswordHash from "Security/PasswordHash";

@Entity('users')
class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public email: string;

    @Column()
    public password: string

    public static fromRequest(body: RegisterRequest) {
        const user = new User()
        user.firstName = body.firstName
        user.lastName = body.lastName
        user.email = body.email
        user.password = body.password
        return user
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword() {
        this.password = await PasswordHash.hashPassword(this.password)
    }

}

export default User
