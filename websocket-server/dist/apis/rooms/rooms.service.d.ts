import { RoomsRepository } from "./rooms.repository";
export declare class RoomsService {
    private readonly roomsRepository;
    constructor(roomsRepository: RoomsRepository);
    saveIfNotExist(name: string): Promise<import("./entities/room.entity").Room>;
}
