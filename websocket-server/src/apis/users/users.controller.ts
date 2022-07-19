import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('user')
export class UsersController {
  
  constructor(private readonly usersService: UsersService){}

  @Post()
  join(@Body('userName') userName: string){
    this.usersService.saveIfNotExist(userName);
  }

}