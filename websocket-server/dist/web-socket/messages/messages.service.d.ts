import { Message } from './entities/message.entity';
import { MessageRepository } from './meesages.repository';
export declare class MessagesService {
    private readonly messageRepository;
    constructor(messageRepository: MessageRepository);
    findAllByRoom(room: string): Promise<Message[]>;
}
