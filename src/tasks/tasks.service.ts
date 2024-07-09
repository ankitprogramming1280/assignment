import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto, UpdateTaskDto } from 'src/dtos/task.dto';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entities/user.entity';
import { Task } from 'src/entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly authService: AuthService
    ){}

    async createTask(req: Request, createTaskDto: CreateTaskDto){
        const user: User = await this.authService.getuser(req['user'].id)
        return await this.taskRepository.create(createTaskDto, user)
    }

    async fetchTaskById(req:Request, taskId: string){
        const task: Task = await this.verifyUserWithTask(taskId,req)
        return task;
    }

    async fetchTasks(req:Request){
        const tasks = await this.taskRepository.getTasksByUser(req['user'].id)
        return tasks
    }

    async updateTask(req: Request,taskId: string, updateTaskDto: UpdateTaskDto){
        const task: Task = await this.verifyUserWithTask(taskId,req)
        task.description = updateTaskDto?.description
        task.status = updateTaskDto?.staus
        const updatedTask = await this.taskRepository.updateTask(task)
        return updatedTask
    }

    async deleteTask(req: Request, taskId: string){
        const task: Task = await this.verifyUserWithTask(taskId,req)
        return await this.taskRepository.deleteTasks([...task.id])
    }

    private async verifyUserWithTask(taskId: string, req: Request){
        const task = await this.taskRepository.getTaskById(taskId)
        if(task.user.id !== req['user'].id){
            throw new UnauthorizedException('You cannot access other tasks')
        }
        return task;
    }
}
