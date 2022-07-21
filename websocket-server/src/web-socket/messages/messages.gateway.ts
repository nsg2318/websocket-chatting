import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Room } from 'src/apis/rooms/entities/room.entity';
import { RoomsService } from 'src/apis/rooms/rooms.service';
import { User } from 'src/apis/users/entities/user.entity';
import { UsersService } from 'src/apis/users/users.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateRoomGatewayDto } from './dto/create-room.dto';
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
    private readonly roomsService: RoomsService,
    ) {}

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
  @SubscribeMessage('createRoom')
  async createRoom(@MessageBody('dto') dto: CreateRoomGatewayDto, @ConnectedSocket() client: Socket) {
    const createdRoom: Room = await this.roomsService.save(dto);
    let participants = dto.participants;
    participants.push(dto.hostName);
    const socketIds: string[] = await this.usersService.findSocketIdArrayByUserName(participants);
    socketIds.map(socketId => {
      console.log(`소켓ID : ${socketId}, requestJoinRoom 이벤트발생. createdRoom.id = ${createdRoom.id}` );
      this.server.to(socketId).emit('requestJoinRoom',createdRoom.id);
    });
    return true; 
  }

  @SubscribeMessage('justJoin')
  async justJoin(@MessageBody('roomId') roomId: string, @ConnectedSocket() client: Socket){
    console.log(`소켓ID : ${client.id}, justJoin 이벤트수신. roomId = ${roomId}` );
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
