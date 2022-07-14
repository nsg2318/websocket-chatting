import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./users.repository";

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository){}


  async create(name: string) {
    if(!name) {
      throw new UnauthorizedException('닉네임을 입력해주세요.');
    }

    this.userRepository.join(name);
  }

}