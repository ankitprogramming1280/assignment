import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { TaskRepository } from './task.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([Task]),
    AuthModule
  ],
  providers: [TasksService, JwtAuthGuard, TaskRepository],
  controllers: [TasksController],
  exports: [TasksService]
})
export class TasksModule {}
