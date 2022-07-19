import { Body, Controller, Post } from "@nestjs/common";
import { RoomsService } from "./rooms.service";

@Controller('room')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService){
    }

    @Post()
    async joinRoom(@Body('roomName') roomName: string){
        return await this.roomsService.saveIfNotExist(roomName);
    }
}