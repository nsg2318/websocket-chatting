import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { UsersRepository } from "../users/users.repository";
import { RoomUser } from "./entities/roomuser.entity";
import { RoomsUsersRepository } from "./roomsUsers.repository";

@Injectable()
export class RoomsUsersService {

  constructor(
    private readonly roomsUsersRepository: RoomsUsersRepository,
    private readonly usersRepository: UsersRepository,){}

  async findAllByUserId(userId: number) {
    const user: User = await this.usersRepository.findById(userId);
    const roomsUsers: RoomUser[] = await this.roomsUsersRepository.findByUser(user);
    //todo
    //roomsUsers -> room 리스트로 map 변환
  }

}