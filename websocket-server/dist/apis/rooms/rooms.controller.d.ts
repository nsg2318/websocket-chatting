import { RoomsService } from "./rooms.service";
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    joinRoom(roomName: string): Promise<import("./entities/room.entity").Room>;
}
