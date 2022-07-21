import { Injectable } from "@nestjs/common";
import { Room } from "../rooms/entities/room.entity";
import { RoomsRepository } from "../rooms/rooms.repository";
import { User } from "../users/entities/user.entity";
import { UsersRepository } from "../users/users.repository";
import { RoomsUsersRepository } from "./roomsUsers.repository";

@Injectable()
export class RoomsUsersService {

  constructor(
    private readonly roomsUsersRepository: RoomsUsersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly roomsRepository: RoomsRepository,
    ){}

  async findAllByUserId(userId: number) {
    const user: User = await this.usersRepository.findById(userId);
    return await this.roomsUsersRepository.findByUser(user);
  }

  async exitRoom(userId: number, roomId: number) {
    const user: User = await this.usersRepository.findById(userId);
    const room: Room = await this.roomsRepository.findById(roomId);
    this.roomsUsersRepository.exitRoom(user, room);
  }

}