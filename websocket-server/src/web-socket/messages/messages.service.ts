import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Room } from 'src/apis/rooms/entities/room.entity';
import { RoomsRepository } from 'src/apis/rooms/rooms.repository';
import { User } from 'src/apis/users/entities/user.entity';
import { UserRepository } from 'src/apis/users/users.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { EmitMessageDto } from './dto/emit-message.dto';
import { Message } from './entities/message.entity';
import { MessageRepository } from './meesages.repository';


@Injectable()
export class MessagesService {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
    private readonly roomRepository: RoomsRepository
  ){}

  async findAllByRoom(roomId: number) {
    return await this.messageRepository.findAllByRoom(roomId);
  }

  async joinRoom(roomId: number, client: Socket) {
   await client.join(roomId.toString());
  }

  //todo user 메시지 보낼때마다 등록됨
  //새로 입장하는사람은 findall 할 때 못불러옴
  async create(createMessageDto: CreateMessageDto, client: Socket) {
    const {roomId, text, userName} = createMessageDto;
    const room: Room = await this.roomRepository.findById(roomId);
    const user: User = await this.userRepository.findByName(userName);
    const message: Message = await this.messageRepository.saveMessage(room,user,text);
    return new EmitMessageDto(room.name,userName,message);
  }

}
