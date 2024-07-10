import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { JwtAuthService } from "src/auth/jwt.service";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(
        private readonly jwtService : JwtAuthService
    ){}
    async canActivate(context: ExecutionContext):Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const token = request?.headers?.authorization?.split(' ')[1]
        if(!token){
            throw new UnauthorizedException('User Not Found')
        }
        try{
            const payload = await this.jwtService.verify(token)
            request['user'] = payload
        }
        catch(err){
            throw new UnauthorizedException('Invalid Token')
        }
        return true
    }
}
