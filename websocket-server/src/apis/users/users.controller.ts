import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./users.service";

@Controller()
export class UsersController {
  
  constructor(private readonly userService: UserService){}

  @Post('user')
  join(@Body('userName') userName: string){
    this.userService.saveIfNotExist(userName);
  }

}