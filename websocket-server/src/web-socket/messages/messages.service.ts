import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Room } from 'src/apis/rooms/entities/room.entity';
import { RoomsRepository } from 'src/apis/rooms/rooms.repository';
import { User } from 'src/apis/users/entities/user.entity';
import { UsersRepository } from 'src/apis/users/users.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateRoomGatewayDto } from './dto/create-room.dto';
import { EmitMessageDto } from './dto/emit-message.dto';
import { Message } from './entities/message.entity';
import { MessagesRepository } from './meesages.repository';


@Injectable()
export class MessagesService {

  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly roomRepository: RoomsRepository
  ){}

  //todo : 개선
  async findAllByRoom(roomId: number) {
    const messages: Message[] = await this.messagesRepository.findAllByRoom(roomId);
    const emitResult = messages.map((message) => new EmitMessageDto(message));
    return emitResult;
  }

  async joinRoom(roomId: string, client: Socket) { 
   await client.join(roomId.toString());
  }

  async create(createMessageDto: CreateMessageDto) {
    const {roomId, text, userName} = createMessageDto;
    const room: Room = await this.roomRepository.findById(roomId);
    const user: User = await this.usersRepository.findByName(userName);
    const message = await this.messagesRepository.saveMessage(room,user,text);
    return new EmitMessageDto(message);
  }

}
