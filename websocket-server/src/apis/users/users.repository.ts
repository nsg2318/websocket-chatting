import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersRepository {

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    ){}

  saveByName(name: string): void {
    const user: User = this.userRepository.create({name});
    this.userRepository.save(user);
  }

  async findByName(name: string) {
    return await this.userRepository.findOne({where: {name: name}});
  }

  async findById(userId: number): Promise<User>{
    return await this.userRepository.findOne({where: {id: userId}});
  }
}