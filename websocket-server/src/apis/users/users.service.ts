import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UpdateResult } from "typeorm";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository){}


  async saveIfNotExist(name: string) {
    if(!name) {
      throw new UnauthorizedException('닉네임을 입력해주세요.');
    }

    let user = await this.usersRepository.findByName(name);
    if(!user){
      user = await this.usersRepository.saveByName(name);
    }
    return user;
  }

  async saveSocketId(userId: number,socketId: string) {
    const updateResult: UpdateResult = await this.usersRepository.updateSocketIdByUserId(userId,socketId);
    console.log(updateResult);
    
  }

}