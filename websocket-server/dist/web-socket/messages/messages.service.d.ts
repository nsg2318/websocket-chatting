import { Socket } from 'socket.io';
import { RoomsRepository } from 'src/apis/rooms/rooms.repository';
import { UsersRepository } from 'src/apis/users/users.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { EmitMessageDto } from './dto/emit-message.dto';
import { MessagesRepository } from './meesages.repository';
export declare class MessagesService {
    private readonly messagesRepository;
    private readonly usersRepository;
    private readonly roomRepository;
    constructor(messagesRepository: MessagesRepository, usersRepository: UsersRepository, roomRepository: RoomsRepository);
    findAllByRoom(roomId: number): Promise<EmitMessageDto[]>;
    joinRoom(roomId: number, client: Socket): Promise<void>;
    create(createMessageDto: CreateMessageDto): Promise<EmitMessageDto>;
}
