import { CreateRoomDto } from "./dto/create-room.dto";
import { RoomsService } from "./rooms.service";
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    joinRoom(createRoomDto: CreateRoomDto): Promise<import("./entities/room.entity").Room>;
}
