import { Body, Controller, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, RefreshTokenDto, UpdateUserDto, UserOutputDto } from 'src/dtos/user.dto';
import { Request, Response } from 'express';
import {  ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@ApiTags('Auth')
@ApiBadRequestResponse({
    status:HttpStatus.BAD_REQUEST
})
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){}

    @ApiOperation({
        summary:'User Login',
    })
    @ApiBody({
        type:LoginUserDto
    })
    @ApiOkResponse({
        status:HttpStatus.OK,
    })
    @Post('login')
    async login(@Body()loginDto: LoginUserDto, @Req()req: Request, @Res() res: Response ){
        const data = await this.authService.login(loginDto)
        return res.status(HttpStatus.OK).send(data)
    }

    @ApiOperation({
        summary:'User Registration'
    })
    @ApiBody({
        type:CreateUserDto
    })
    @ApiCreatedResponse({
        status:HttpStatus.CREATED,
        type:UserOutputDto
    })
    @Post('register')
    async register(@Body()createUserDto: CreateUserDto, @Req()req: Request, @Res() res: Response ){
        const data = await this.authService.register(createUserDto)
        return res.status(HttpStatus.CREATED).send(data)
    }

    @ApiOperation({
        summary:'User Profile Updation'
    })
    @ApiBody({
        type:UpdateUserDto
    })
    @ApiOkResponse({
        status:HttpStatus.OK,
        type:UserOutputDto
    })
    @Put('user/:id')
    async updateUser(@Param() userId : string, @Body() updateUserDto : UpdateUserDto, @Req() req: Request, @Res() res: Response){
        
    }

    @Post('token-refresh')
    @ApiOperation({
        summary:'Refresh token to get new access-token'
    })
    @ApiBody({
        type: RefreshTokenDto
    })
    @ApiOkResponse({
        status:HttpStatus.OK
    })
    async refreshToken(@Body() refreshToken: RefreshTokenDto, @Req() req:Request, @Res() res: Response){
        const data = await this.authService.refreshToken(refreshToken.refreshToken)
        return res.status(HttpStatus.OK).send(data)
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary:'Logout User'
    })
    async logout(@Req() req: Request, @Res() res:Response){
        res.clearCookie('jwt')
        return res.status(HttpStatus.OK).send({
            message:'User Logged Out Successfully'
        })
    }
}
