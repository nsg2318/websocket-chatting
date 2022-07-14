import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    ){}

  async join(name: string): Promise<User>{
    const user: User = this.userRepository.create({name});
  
    return await this.userRepository.save(user);

  }
}