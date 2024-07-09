import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { JwtAuthService } from "src/auth/jwt.service";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(
        private readonly jwtService : JwtAuthService
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const token = request.headers.authorization.split(' ')[1]
        if(!token){
            throw new UnauthorizedException('User Not Found')
        }
        try{
            const payload = this.jwtService.verify(token)
            request['user'] = payload
        }
        catch(err){
            throw new UnauthorizedException('Invalid Token')
        }
        return true
    }
}
