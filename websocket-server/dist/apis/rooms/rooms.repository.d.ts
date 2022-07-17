import { Repository } from "typeorm";
import { Room } from "./entities/room.entity";
export declare class RoomsRepository {
    private roomRepository;
    constructor(roomRepository: Repository<Room>);
    saveByName(name: string): Promise<Room>;
    findByName(roomName: string): Promise<Room>;
    findById(roomId: number): Promise<Room>;
}
