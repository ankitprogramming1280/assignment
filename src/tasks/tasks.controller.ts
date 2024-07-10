import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskOutputDto, UpdateTaskDto } from 'src/dtos/task.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Task')
@ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST
})
@ApiUnauthorizedResponse({
    status:HttpStatus.UNAUTHORIZED
})
@ApiBearerAuth('access-token')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(
        private readonly taskService: TasksService,
    ){}

    @ApiBody({
        type: CreateTaskDto,
    })
    @ApiCreatedResponse({
        status: HttpStatus.CREATED,
        type: TaskOutputDto
    })
    @ApiOperation({
        summary:'Task creation'
    })
    @Post()
    async createTask(@Body() createTask: CreateTaskDto,@Req()req: Request, @Res() res: Response){
        const data = await this.taskService.createTask(req,createTask)
        return res.status(HttpStatus.CREATED).send({...data})
    }


    @Get(':id')
    @ApiOkResponse({
        status: HttpStatus.OK,
        type: TaskOutputDto
    })
    @ApiOperation({
        summary:'Fetch Task by Id'
    })
    async fetchTaskById(@Param('id')taskId: string, @Req()req: Request, @Res() res: Response){
        const data = await this.taskService.fetchTaskById(req, taskId)
        return res.status(HttpStatus.OK).send({...data})
    }


    @Get()
    @ApiOkResponse({
        status: HttpStatus.OK,
        type: [TaskOutputDto]
    })
    @ApiOperation({
        summary:'Fetch all tasks of a user'
    })
    async fetchAllTasksByUser(@Req() req: Request, @Res() res: Response){
        const tasks = await this.taskService.fetchTasks(req)
        return res.status(HttpStatus.OK).send({tasks})
    }

    @ApiAcceptedResponse({
        status:HttpStatus.ACCEPTED,
        type:TaskOutputDto
    })
    @ApiBody({
        type: UpdateTaskDto
    })
    @ApiOperation({
        summary:'Update task by Id'
    })
    @Put(':id')
    async updateTask(@Body() updateTaskDto: UpdateTaskDto,@Param('id')taskId: string, @Req()req: Request, @Res() res: Response){
        const task = await this.taskService.updateTask(req, taskId, updateTaskDto)
        return res.status(HttpStatus.ACCEPTED).send(task)
    }

    @ApiOperation({
        summary:'Delete task by Id'
    })
    @ApiOkResponse({
        status:HttpStatus.OK
    })
    @Delete(':id')
    async deleteTask(@Param('id') taskId: string, @Req() req: Request, @Res() res: Response){
        const task = await this.taskService.deleteTask(req,taskId)
        return res.status(HttpStatus.OK).send({
            message: 'Deleted Successfully'
        })
    }
}
