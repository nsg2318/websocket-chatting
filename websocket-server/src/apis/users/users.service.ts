import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./users.repository";

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository){}


  async saveIfNotExist(name: string) {
    if(!name) {
      throw new UnauthorizedException('닉네임을 입력해주세요.');
    }

    const user = await this.userRepository.findByName(name);
    if(!user){
      this.userRepository.saveByName(name);
    }
  }

}