import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateRoomGatewayDto } from "src/web-socket/messages/dto/create-room.dto";
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

  async findUserBySocketId(userName: string, sockets: Set<string>) {
    const socketsArr = Array.from(sockets);
    let userArr: User[] = [];
    for(let i = 0; i < socketsArr.length; i++){
      const socket = socketsArr[i];
      const user: User = await this.usersRepository.findBySocketId(socket);
      if(user){
        userArr.push(user);
      }
    }
    
    const hostIndex = userArr.findIndex( obj => obj.name == userName );
    userArr.splice(hostIndex,1);
    return userArr;
  }

  async findSocketIdByUserId(userId: number) {
    const user: User = await this.usersRepository.findById(userId);
    return user.socketId;
  }

  async findSocketIdArrayByUserName(userNameList: string[]) {
    let socketIdArray: string[] = [];
    for(const name of userNameList){
      const user: User = await this.usersRepository.findByName(name);
      socketIdArray.push(user.socketId);
    }
    return socketIdArray;

  }
  
}