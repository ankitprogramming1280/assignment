import { Body, Controller, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from 'src/dtos/user.dto';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){}

    @Post('login')
    async login(@Body()loginDto: LoginUserDto, @Req()req: Request, @Res() res: Response ){
        const data = await this.authService.login(loginDto)
        return res.status(HttpStatus.OK).send(data)
    }

    @Post('register')
    async register(@Body()createUserDto: CreateUserDto, @Req()req: Request, @Res() res: Response ){
        const data = await this.authService.register(createUserDto)
        return res.status(HttpStatus.CREATED).send(data)
    }

    @Put('user/:id')
    async updateUser(@Param() userId : string, @Body() updateUserDto : UpdateUserDto, @Req() req: Request, @Res() res: Response){
        
    }
}
