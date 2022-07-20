import { Injectable, UnauthorizedException } from "@nestjs/common";
import { async } from "rxjs";
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
    await this.usersRepository.updateSocketIdByUserId(userId,socketId);
  }

  async findUserBySocketId(sockets: Set<string>) {
    const socketsArr = Array.from(sockets);
    let userArr: User[] = [];
    console.log(socketsArr[0]);
    for(let i = 0; i < socketsArr.length; i++){
      const socket = socketsArr[i];
      const user: User = await this.usersRepository.findBySocketId(socket);
      userArr.push(user);
    }
    return userArr;
  }

  async findSocketIdByUserId(userId: number) {
    const user: User = await this.usersRepository.findById(userId);
    return user.socketId;
  }
}