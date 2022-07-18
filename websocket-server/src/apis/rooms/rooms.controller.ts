import { Body, Controller, Post } from "@nestjs/common";
import { RoomsService } from "./rooms.service";

@Controller()
export class RoomsController {
    constructor(private readonly roomsService: RoomsService){
    }

    @Post('room')
    async joinRoom(@Body('roomName') roomName: string){
        return await this.roomsService.saveIfNotExist(roomName);
    }
}