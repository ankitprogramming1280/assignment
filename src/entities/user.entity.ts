import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity('user')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstName : string

    @Column()
    lastName : string

    @Column()
    age: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    mobile: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    @OneToMany(()=> Task, task=> task.user)
    tasks: Task[]
}