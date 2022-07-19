import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { RoomUser } from "./entities/roomuser.entity";

@Injectable()
export class RoomsUsersRepository {
  constructor(
    @InjectRepository(RoomUser)
    private roomUserRepository: Repository<RoomUser>,
  ){}

  async findByUser(user: User) {
    return await this.roomUserRepository.find({where: {user: user}});
  }
}