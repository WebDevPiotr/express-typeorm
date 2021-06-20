type RegisterRequest = Readonly<{
    firstName: string
    lastName: string
    email: string,
    password: string
    repeatPassword: string
}>

export default RegisterRequest