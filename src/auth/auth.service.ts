import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';
import { UserRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, LoginUserDto } from 'src/dtos/user.dto';
import { HASHING_SALT_ROUNDS } from 'src/core/constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtAuthService,
        private readonly userRepository: UserRepository
    ){}

    async getuser(userId: string){
        return await this.userRepository.findOneById(userId)
    }
    async login(data: LoginUserDto){
        const user : User = await this.userRepository.findOneByEmail(data.email)
        if(!user){
            throw new HttpException('Invalid Email or Password', HttpStatus.BAD_REQUEST)
        }
        const validPassword = await bcrypt.compare(data.password, user.password)
        if(!validPassword){
            throw new HttpException('Invalid Email or Password', HttpStatus.BAD_REQUEST)
        }
        const token = await this.jwtService.sign(user)
        return {
            message: 'Login Success',
            ...token
        }
    }

    async register(user: CreateUserDto){
        const userExists = await this.userRepository.findOneByEmail(user.email)
        if(!user.password || !user.email){
            throw new HttpException('Email and password fields are mandatory', HttpStatus.BAD_REQUEST)
        }
        if(userExists){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }
        const hashedPassword = await this.hashPassword(user.password)
        user.password = hashedPassword
        return await this.userRepository.create(user)
    }

    async hashPassword(password: string){
        return  bcrypt.hash(password,HASHING_SALT_ROUNDS)
    }
}
