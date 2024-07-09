import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:'localhost:',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
  exports:[JwtAuthGuard]
})
export class AppModule {}
