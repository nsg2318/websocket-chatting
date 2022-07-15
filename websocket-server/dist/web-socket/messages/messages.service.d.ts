import { Socket } from 'socket.io';
import { Message } from './entities/message.entity';
import { MessageRepository } from './meesages.repository';
export declare class MessagesService {
    private readonly messageRepository;
    constructor(messageRepository: MessageRepository);
    findAllByRoom(roomId: number): Promise<Message[]>;
    joinRoom(roomId: number, client: Socket): void;
}
