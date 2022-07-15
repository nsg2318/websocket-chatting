import { RoomsService } from "./rooms.service";
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    findOrCraeteRooms(roomName: string): Promise<void>;
}
