import { Injectable } from '@nestjs/common';
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

  // messages: Message[] = [{name: 'SYSTEM', text: '<<채팅방이 생성되었습니다.>>', time: Date.now(),}];

  // clientToUser = {};

  // identify(name: string, clientId: string) {
  //   this.clientToUser[clientId] = name;

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

  // findAll() {
  //   return this.messages;
  // }

  
}
