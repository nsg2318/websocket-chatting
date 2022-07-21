import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Room } from "../rooms/entities/room.entity";
import { User } from "../users/entities/user.entity";
import { RoomUser } from "./entities/roomuser.entity";

@Injectable()
export class RoomsUsersRepository {
  
  constructor(
    @InjectRepository(RoomUser)
    private roomUserRepository: Repository<RoomUser>,
  ){}

  async findByUser(user: User) {
    return await this.roomUserRepository.find({where: {user: user.id}});
  }

  async save(user: User, room: Room){

    const roomUser = this.roomUserRepository.create({user: user,room: room});
    return await this.roomUserRepository.save(roomUser);
  }

  exitRoom(user: User, room: Room) {
    this.roomUserRepository.delete({user: user, room: room});
  }
}