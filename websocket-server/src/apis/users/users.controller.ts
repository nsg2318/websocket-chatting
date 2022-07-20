import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('user')
export class UsersController {
  
  constructor(private readonly usersService: UsersService){}

  @Post()
  async join(@Body('userName') userName: string){
    return await this.usersService.saveIfNotExist(userName);
  }
}