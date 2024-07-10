import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { STATUS } from "src/core/enum"
import { Task } from "src/entities/task.entity"

export class CreateTaskDto{
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    description: string

    @IsDate()
    @ApiProperty()
    @IsNotEmpty()
    dueDate: Date

    @ApiProperty()
    @IsEnum(STATUS)
    status: STATUS
}

export class UpdateTaskDto{
    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsString()
    title: string

    @IsDate()
    @ApiProperty()
    dueDate: Date

    @ApiProperty()
    @IsEnum(STATUS)
    staus: STATUS
}

export class TaskOutputDto{
    @ApiProperty()
    @Expose()
    id: string

    @ApiProperty()
    @Expose()
    title: string

    @ApiProperty()
    @Expose()
    description: string

    @ApiProperty()
    @Expose()
    status : STATUS

    @ApiProperty()
    @Expose()
    dueDate: Date

    constructor(task:Task){
        this.id = task.id
        this.title = task.title
        this.description = task.description
        this.status = task.status
        this.dueDate = task.dueDate
    }
}