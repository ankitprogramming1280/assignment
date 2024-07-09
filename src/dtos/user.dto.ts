export class CreateUserDto{
    firstName : string
    lastName : string
    age: number
    email: string
    password: string
    mobile: string
}

export class LoginUserDto{
    email: string
    password: string
}

export class UpdateUserDto{
    firstName : string
    lastName : string
    age: number
    mobile: string
}