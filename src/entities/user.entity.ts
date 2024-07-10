import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity('user')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        nullable: true
    })
    firstName : string

    @Column({
        nullable: true
    })
    lastName : string

    @Column({
        nullable: true
    })
    age: number

    @Column({
        nullable: false
    })
    email: string

    @Column({
        nullable: false
    })
    password: string

    @Column({
        nullable: true
    })
    mobile: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    @OneToMany(()=> Task, task=> task.user)
    tasks: Task[]
}