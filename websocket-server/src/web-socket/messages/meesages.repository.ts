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
  
  async findAllByRoom(room: string): Promise<Message[]> {
    return await this.messageRepository.find({where: {room: `${room}`}});
  }
}