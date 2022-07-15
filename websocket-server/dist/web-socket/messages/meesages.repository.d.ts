import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";
export declare class MessageRepository {
    private messageRepository;
    constructor(messageRepository: Repository<Message>);
    findAllByRoom(roomId: number): Promise<Message[]>;
}
