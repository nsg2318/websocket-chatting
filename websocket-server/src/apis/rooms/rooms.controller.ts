import { Body, Controller, Post } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { RoomsService } from "./rooms.service";

@Controller('room')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService){
    }

    @Post()
    async joinRoom(@Body('createRoomDto') createRoomDto: CreateRoomDto){
        console.log(createRoomDto);
        return await this.roomsService.save(createRoomDto);
    }
}