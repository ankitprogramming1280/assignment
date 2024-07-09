import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "src/dtos/task.dto";
import { Task } from "src/entities/task.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class TaskRepository{
    constructor(
        @InjectRepository(Task)
        private readonly taskRepo: Repository<Task>
    ){}

    async create(task: CreateTaskDto, user: User){
        const newTask = new Task()
        newTask.title = task.title
        newTask.description = task.description
        newTask.user = user
        return await this.taskRepo.save(newTask)
    }

    async getTaskById(id: string){
        return await this.taskRepo.find({
            where: {
                id
            },
            relations:['user']
        })[0]
    }

    async getTasksByUser(userId: string){
        return await this.taskRepo.find({
            where:{
                user:{
                    id: userId
                }
            }
        })
    }

    async updateTask(task: Task){
        return await this.taskRepo.save(task)
    }

    async deleteTasks(ids:string[]){
        for(let id of ids){
            await this.taskRepo.delete(id)
        }
        return
    }
}