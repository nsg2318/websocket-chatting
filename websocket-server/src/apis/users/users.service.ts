import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository){}


  async saveIfNotExist(name: string) {
    if(!name) {
      throw new UnauthorizedException('닉네임을 입력해주세요.');
    }

    const user = await this.usersRepository.findByName(name);
    if(!user){
      this.usersRepository.saveByName(name);
    }
  }

}