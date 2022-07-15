import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { MessageRepository } from './meesages.repository';


@Injectable()
export class MessagesService {

  constructor(
    private readonly messageRepository: MessageRepository
  ){}

  async findAllByRoom(roomId: number) {
    return await this.messageRepository.findAllByRoom(roomId);
  }

  joinRoom(roomId: number, client: Socket) {
   client.join(roomId.toString());
  }
  //   return Object.values(this.clientToUser);
  // }

  // getClientName(clientId: string) {
  //   return this.clientToUser[clientId];
  // }

  // create(createMessageDto: CreateMessageDto, clientId: string) {
  //   const name = this.clientToUser[clientId];
  //   const message = new Message(createMessageDto,name);
  //   this.messages.push(message);
  //   return message;
  // }

}
