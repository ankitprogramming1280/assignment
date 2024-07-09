import { STATUS } from "src/core/enum"

export class CreateTaskDto{
    title: string
    description: string
    status: STATUS
}

export class UpdateTaskDto{
    description: string
    staus: STATUS
}