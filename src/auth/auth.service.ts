import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';
import { UserRepository } from './auth.repository';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtAuthService,
        private readonly userRepository: UserRepository
    ){}

    async login(email: string, password: string){
        const user : User = await this.userRepository.findOneByEmail(email)
        if(!user){
            throw new HttpException('Invalid Email or Password', HttpStatus.BAD_REQUEST)
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            throw new HttpException('Invalid Email or Password', HttpStatus.BAD_REQUEST)
        }
        const token = await this.jwtService.sign(user)
        return {
            message: 'Login Success',
            ...token
        }
    }

    async register(user: any){
        const userExists = await this.userRepository.findOneByEmail(user.email)
        if(userExists){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }
        return await this.userRepository.create(user)
    }
}
