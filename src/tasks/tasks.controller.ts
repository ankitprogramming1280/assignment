import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from 'src/dtos/task.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(
        private readonly taskService: TasksService,
    ){}

    @Post()
    async createTask(@Body() createTask: CreateTaskDto,@Req()req: Request, @Res() res: Response){
        const data = await this.taskService.createTask(req,createTask)
        return res.status(HttpStatus.ACCEPTED).send({...data})
    }

    @Get(':id')
    async fetchTaskById(@Param('id')taskId: string, @Req()req: Request, @Res() res: Response){
        const data = await this.taskService.fetchTaskById(req, taskId)
        return res.status(HttpStatus.OK).send({...data})
    }

    @Get('all')
    async fetchAllTasksByUser(@Req() req: Request, @Res() res: Response){
        const tasks = await this.taskService.fetchTasks(req)
        return res.status(HttpStatus.OK).send({tasks})
    }

    @Put(':id')
    async updateTask(@Body() updateTaskDto: UpdateTaskDto,@Param('id')taskId: string, @Req()req: Request, @Res() res: Response){
        const task = await this.taskService.updateTask(req, taskId, updateTaskDto)
        return res.status(HttpStatus.ACCEPTED).send(task)
    }

    @Delete(':id')
    async deleteTask(@Param('id') taskId: string, @Req() req: Request, @Res() res: Response){
        const task = await this.taskService.deleteTask(req,taskId)
        return res.status(HttpStatus.OK).send({
            message: 'Deleted Successfully'
        })
    }
}
