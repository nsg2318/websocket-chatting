import { Server, Socket } from 'socket.io';
import { RoomsRepository } from 'src/apis/rooms/rooms.repository';
import { UserRepository } from 'src/apis/users/users.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { EmitMessageDto } from './dto/emit-message.dto';
import { MessageRepository } from './meesages.repository';
export declare class MessagesService {
    private readonly messageRepository;
    private readonly userRepository;
    private readonly roomRepository;
    server: Server;
    constructor(messageRepository: MessageRepository, userRepository: UserRepository, roomRepository: RoomsRepository);
    findAllByRoom(roomId: number): Promise<EmitMessageDto[]>;
    joinRoom(roomId: number, client: Socket): Promise<void>;
    create(createMessageDto: CreateMessageDto, client: Socket): Promise<EmitMessageDto>;
}
