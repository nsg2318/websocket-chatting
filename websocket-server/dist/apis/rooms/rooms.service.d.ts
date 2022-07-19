import { RoomsUsersRepository } from "../roomsusers/roomsUsers.repository";
import { UsersRepository } from "../users/users.repository";
import { CreateRoomDto } from "./dto/create-room.dto";
import { Room } from "./entities/room.entity";
import { RoomsRepository } from "./rooms.repository";
export declare class RoomsService {
    private readonly roomsRepository;
    private readonly usersRepository;
    private readonly roomsUsersRepository;
    constructor(roomsRepository: RoomsRepository, usersRepository: UsersRepository, roomsUsersRepository: RoomsUsersRepository);
    save(createRoomDto: CreateRoomDto): Promise<Room>;
}
