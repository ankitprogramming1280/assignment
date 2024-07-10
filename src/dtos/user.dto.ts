import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { User } from "src/entities/user.entity"

export class CreateUserDto{
    @ApiProperty()
    @IsString()
    firstName : string

    @ApiProperty()
    @IsString()
    lastName : string

    @ApiProperty()
    @IsNumber()
    age: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty()
    @IsString()
    mobile: string
}

export class LoginUserDto{
    @IsString()
    @IsEmail()
    @ApiProperty()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
}

export class UpdateUserDto{

    @ApiProperty()
    @IsString()
    firstName : string

    @ApiProperty()
    @IsString()
    lastName : string

    @ApiProperty()
    @IsNumber()
    age: number

    @ApiProperty()
    @IsString()
    mobile: string
}

export class RefreshTokenDto{
    @ApiProperty()
    @IsString()
    refreshToken: string

}

export class UserOutputDto{
    constructor(user:User){
        this.age = user.age
        this.email = user.email
        this.firstName = user.firstName
        this.id = user.id
        this.lastName = user.lastName
        this.mobile = user.mobile
    }

    @ApiProperty()
    @Expose()
    id: string

    @ApiProperty()
    @Expose()
    firstName: string

    @ApiProperty()
    @Expose()
    lastName: string

    @ApiProperty()
    @Expose()
    email: string

    @ApiProperty()
    @Expose()
    mobile: string

    @ApiProperty()
    @Expose()
    age: number
}