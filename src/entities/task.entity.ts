import { STATUS } from "src/core/enum";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('task')
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        nullable: false
    })
    title: string

    @Column({
        nullable: false
    })
    description: string

    @Column({enum: STATUS, default: STATUS.Pending})
    status: STATUS

    @Column({
        nullable: false
    })
    dueDate: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=> User, user=> user.tasks)
    user: User
}