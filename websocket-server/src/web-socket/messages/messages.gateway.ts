import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/apis/users/entities/user.entity';
import { UsersService } from 'src/apis/users/users.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { EmitMessageDto } from './dto/emit-message.dto';
import { MessagesService } from './messages.service';

@WebSocketGateway({cors: {
	origin: 'http://localhost:3000',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
    ) {}

    //io.to(socketid).emit('message', 'for your eyes only');
  //   if (io.sockets.connected[socketid]) {
  //     io.sockets.connected[socketid].emit('message', 'for your eyes only');
  // }
  // message 전송
  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    ) {
    const createdMessage: EmitMessageDto = await this.messagesService.create(createMessageDto);
    this.server.to(createMessageDto.roomId.toString()).emit('message', createdMessage);
    return createdMessage;
  }

  //모든 message 불러오기
  @SubscribeMessage('findAllMessageByRoomId')
  async findAllByRoom(@MessageBody('roomId') roomId: number) {
    return await this.messagesService.findAllByRoom(roomId);
  }

  //room 입장
  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody('roomId') roomId: number, @ConnectedSocket() client: Socket) {
    console.log(client.id);
    await this.messagesService.joinRoom(roomId, client);
    return true;
  }

  @SubscribeMessage('saveSocketId')
  async saveSocket(@MessageBody('userId') userId: number, @ConnectedSocket() client: Socket){
    return await this.usersService.saveSocketId(userId,client.id);
  }

  @SubscribeMessage('getAllSocketUser')
  async getAllSocketUser(@MessageBody('userName') userName: string){
    const sockets: Set<string> = await this.server.allSockets();
    const users: User[] = await this.usersService.findUserBySocketId(userName, sockets);
    return users;
  }

}
