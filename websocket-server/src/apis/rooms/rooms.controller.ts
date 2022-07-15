import { Body, Controller, Post } from "@nestjs/common";
import { Room } from "./entities/room.entity";
import { RoomsService } from "./rooms.service";

@Controller()
export class RoomsController {
    constructor(private readonly roomsService: RoomsService){
    }

    @Post('room')
    async findOrCraeteRooms(@Body('roomName') roomName: string): Promise<Room>{
        return await this.roomsService.joinRoom(roomName);
    }
}