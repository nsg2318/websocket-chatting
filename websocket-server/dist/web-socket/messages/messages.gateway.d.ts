import { Server, Socket } from 'socket.io';
import { RoomsService } from 'src/apis/rooms/rooms.service';
import { User } from 'src/apis/users/entities/user.entity';
import { UsersService } from 'src/apis/users/users.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateRoomGatewayDto } from './dto/create-room.dto';
import { EmitMessageDto } from './dto/emit-message.dto';
import { MessagesService } from './messages.service';
export declare class MessagesGateway {
    private readonly messagesService;
    private readonly usersService;
    private readonly roomsService;
    server: Server;
    constructor(messagesService: MessagesService, usersService: UsersService, roomsService: RoomsService);
    create(createMessageDto: CreateMessageDto): Promise<EmitMessageDto>;
    findAllByRoom(roomId: number): Promise<EmitMessageDto[]>;
    createRoom(dto: CreateRoomGatewayDto, client: Socket): Promise<void>;
    justJoin(roomId: string, client: Socket): Promise<void>;
    saveSocket(userId: number, client: Socket): Promise<void>;
    getAllSocketUser(userName: string): Promise<User[]>;
}
