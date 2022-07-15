import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';
export declare class MessagesGateway {
    private readonly messagesService;
    server: Server;
    constructor(messagesService: MessagesService);
    findAllByRoom(roomId: number): Promise<import("./entities/message.entity").Message[]>;
    joinRoom(roomId: number, client: Socket): Promise<boolean>;
}
