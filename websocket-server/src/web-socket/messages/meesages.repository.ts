import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ){}
  
  async findAllByRoom(roomId: number): Promise<Message[]> {
    console.log(`room : ${roomId}`);
    const result = await this.messageRepository.find({where: {room: `${roomId}`}});
    console.log(result[0]);
    return result;
  }
}