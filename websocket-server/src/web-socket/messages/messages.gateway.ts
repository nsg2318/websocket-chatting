import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
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

  constructor(private readonly messagesService: MessagesService) {}

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
  findAllByRoom(@MessageBody('roomId') roomId: number) {
    return this.messagesService.findAllByRoom(roomId);
  }

  //room 입장
  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody('roomId') roomId: number, @ConnectedSocket() client: Socket) {
    await this.messagesService.joinRoom(roomId, client);
    return true;
  }

}
