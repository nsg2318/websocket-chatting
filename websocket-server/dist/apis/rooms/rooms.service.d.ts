import { CreateRoomGatewayDto } from "src/web-socket/messages/dto/create-room.dto";
import { RoomsUsersRepository } from "../roomsusers/roomsUsers.repository";
import { UsersRepository } from "../users/users.repository";
import { Room } from "./entities/room.entity";
import { RoomsRepository } from "./rooms.repository";
export declare class RoomsService {
    private readonly roomsRepository;
    private readonly usersRepository;
    private readonly roomsUsersRepository;
    constructor(roomsRepository: RoomsRepository, usersRepository: UsersRepository, roomsUsersRepository: RoomsUsersRepository);
    save(createRoomDto: CreateRoomGatewayDto): Promise<Room>;
}
