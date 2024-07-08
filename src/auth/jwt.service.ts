import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from "src/core/constants";
import { User } from "src/entities/user.entity";

@Injectable()
export class JwtAuthService{
    constructor(
        private readonly jwtService: JwtService
    ){}
    async sign(user: User){
        const payload = {username: user.email, id: user.id}

        return {
            access_token : this.jwtService.sign(payload,{secret: ACCESS_TOKEN_SECRET, expiresIn: ACCESS_TOKEN_EXPIRY}),
            refresh_token: this.jwtService.sign(payload,{secret: REFRESH_TOKEN_SECRET, expiresIn: REFRESH_TOKEN_EXPIRY})
        }
    } 

    async verify(token : string){
        const payload = await this.jwtService.verifyAsync(token,{
            secret:'gdh'
        })
        return payload? payload: null
    }
}