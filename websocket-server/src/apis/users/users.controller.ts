import { Body, Controller, Get, Post } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller('user')
export class UsersController {
  
  constructor(private readonly usersService: UsersService){}

  @Post()
  async join(@Body('userName') userName: string): Promise<User>{
    return await this.usersService.saveIfNotExist(userName);
  }
}