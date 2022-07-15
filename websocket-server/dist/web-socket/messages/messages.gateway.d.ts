import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { EmitMessageDto } from './dto/emit-message.dto';
import { MessagesService } from './messages.service';
export declare class MessagesGateway {
    private readonly messagesService;
    server: Server;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, client: Socket): Promise<EmitMessageDto>;
    findAllByRoom(roomId: number): Promise<import("./entities/message.entity").Message[]>;
    joinRoom(roomId: number, client: Socket): Promise<boolean>;
}
