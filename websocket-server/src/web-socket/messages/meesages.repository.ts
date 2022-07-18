import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "src/apis/rooms/entities/room.entity";
import { User } from "src/apis/users/entities/user.entity";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ){}
  
  async findAllByRoom(roomId: number) {
    return await this.messageRepository.find({where: {room: roomId}});
  }

  async saveMessage(room: Room,user: User, text: string) {
    const message: Message = this.messageRepository.create({room,user,text});
    return await this.messageRepository.save(message);
  }
}