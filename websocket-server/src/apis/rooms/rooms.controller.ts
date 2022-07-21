// import { Body, Controller, Post } from "@nestjs/common";
// import { CreateRoomDto } from "./dto/create-room.dto";
// import { RoomsService } from "./rooms.service";


// 방 생성 api -> websocket

// @Controller('room')
// export class RoomsController {
//     constructor(private readonly roomsService: RoomsService){
//     }

//     @Post()
//     async createRoom(@Body('createRoomDto') createRoomDto: CreateRoomDto){
//         return await this.roomsService.save(createRoomDto);
//     }
// }