import { RoomsService } from "./rooms.service";
import { Server } from 'socket.io';
export declare class RoomsGateway {
    private readonly roomsService;
    server: Server;
    constructor(roomsService: RoomsService);
}
