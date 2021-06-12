type UserRequest = Partial<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string
}>

export default UserRequest