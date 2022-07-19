import { Controller, Get, Param } from "@nestjs/common";
import { RoomsUsersService } from "./roomsUsers.service";

@Controller('roomUser')
export class RoomsUsersController {
  constructor(private readonly roomsUsersService: RoomsUsersService){}

  @Get('/:userId')
  async findAllByUserId(@Param('userId') userId: number) {
    return await this.roomsUsersService.findAllByUserId(userId);
  }

  
}