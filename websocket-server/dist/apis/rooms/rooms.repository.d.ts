import { Repository } from "typeorm";
import { Room } from "./entities/room.entity";
export declare class RoomsRepository {
    private roomRepository;
    constructor(roomRepository: Repository<Room>);
    createIfNotExists(name: string): Promise<Room>;
}
