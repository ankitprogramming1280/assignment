import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtAuthService } from './jwt.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtAuthService],
  controllers: [AuthController]
})
export class AuthModule {}