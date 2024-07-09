import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dtos/user.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async findAll(){

    }

    async findOneByEmail(email: string){
        return await this.userRepository.findOneBy({
            email
        })
    }

    async findOneById(id: string){
        return await this.userRepository.findOneBy({
            id
        })
    }

    async create(user: CreateUserDto){
        const newUser:  User = new User()
        newUser.password = user.password
        newUser.age = user.age
        newUser.email = user.email
        newUser.firstName = user.firstName
        newUser.lastName = user.lastName
        newUser.mobile = user.mobile
        return await this.userRepository.save(newUser)
    }

    async update(user: any){
        return await this.userRepository.save(user)
    }
}