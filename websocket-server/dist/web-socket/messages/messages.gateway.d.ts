import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/apis/users/users.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { EmitMessageDto } from './dto/emit-message.dto';
import { MessagesService } from './messages.service';
export declare class MessagesGateway {
    private readonly messagesService;
    private readonly usersService;
    server: Server;
    constructor(messagesService: MessagesService, usersService: UsersService);
    create(createMessageDto: CreateMessageDto): Promise<EmitMessageDto>;
    findAllByRoom(roomId: number): Promise<EmitMessageDto[]>;
    joinRoom(roomId: number, client: Socket): Promise<boolean>;
    saveSocket(userId: number, client: Socket): Promise<void>;
}
