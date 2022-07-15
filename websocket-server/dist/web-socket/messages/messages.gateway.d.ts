import { MessagesService } from './messages.service';
import { Server } from 'socket.io';
export declare class MessagesGateway {
    private readonly messagesService;
    server: Server;
    constructor(messagesService: MessagesService);
    findAllByRoom(roomId: number): Promise<import("./entities/message.entity").Message[]>;
}
