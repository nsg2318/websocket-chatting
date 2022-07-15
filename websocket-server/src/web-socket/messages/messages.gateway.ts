import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: {
	origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  //message 전송
  // @SubscribeMessage('createMessage')
  // async create(
  //   @MessageBody() createMessageDto: CreateMessageDto,
  //   @ConnectedSocket() client: Socket,
  //   ) {
  //   const message = await this.messagesService.create(createMessageDto,client.id);
  //   this.server.emit('message', message);
  //   return message;
  // }

  //모든 message 불러오기
  @SubscribeMessage('findAllMessageByRoomId')
  findAllByRoom(@MessageBody('roomId') roomId: number) {
    return this.messagesService.findAllByRoom(roomId);
  }

  //room 입장
  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody('roomId') roomId: number, @ConnectedSocket() client: Socket) {
    await this.messagesService.joinRoom(roomId, client);
    console.log(`완료되었습니다. joinId = ${roomId}`);
    return true;
  }

  // //typing 
  // @SubscribeMessage('typing')
  // async typing(
  //   @MessageBody('isTyping') isTyping: boolean,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   const name = await this.messagesService.getClientName(client.id);
  //   client.broadcast.emit('typing', {name, isTyping});
  // }

}
