import { Room } from "src/apis/rooms/entities/room.entity";
import { User } from "src/apis/users/entities/user.entity";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";
export declare class MessagesRepository {
    private messageRepository;
    constructor(messageRepository: Repository<Message>);
    findAllByRoom(roomId: number): Promise<Message[]>;
    saveMessage(room: Room, user: User, text: string): Promise<Message>;
}
