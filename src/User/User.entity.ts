import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import RegisterRequest from 'Security/dto/RegisterRequest'
import PasswordHash from "Security/PasswordHash";

@Entity()
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

    constructor(body: RegisterRequest) {
        this.firstName = body.firstName
        this.lastName = body.lastName
        this.email = body.email
        this.password = body.password
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword() {
        this.password = await PasswordHash.hashPassword(this.password)
    }

}

export default User
