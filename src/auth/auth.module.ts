import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtAuthService } from './jwt.service';
import { UserRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule
  ],
  providers: [AuthService, JwtAuthService, UserRepository],
  controllers: [AuthController],
  exports:[AuthService, JwtAuthService]
})
export class AuthModule {}
