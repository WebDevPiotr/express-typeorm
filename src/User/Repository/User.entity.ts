import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity('users')
class UserEntity {

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

    static builder() {
        return new this.Builder()
    }
    
    static Builder = class {
        
        private id: number;
        private firstName: string;
        private lastName: string;
        private email: string;
        private password: string
    
        public setId(id: number){
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
    
        public build(){
            const user = new UserEntity()
            user.id = this.id
            user.email = this.email
            user.firstName = this.firstName
            user.lastName = this.lastName
            user.password = this.password
            //if(user.id === undefined) delete user.id
            return user
        }
    }

}

export default UserEntity