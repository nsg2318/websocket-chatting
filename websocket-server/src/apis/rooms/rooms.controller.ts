import { Body, Controller, Post } from "@nestjs/common";
import { RoomsService } from "./rooms.service";

@Controller()
export class RoomsController {
    constructor(private readonly roomsService: RoomsService){
    }

    @Post('room')
    async findOrCraeteRooms(@Body('roomName') roomName: string){
        await this.roomsService.joinRoom(roomName);
    }
}