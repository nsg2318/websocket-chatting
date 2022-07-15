import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./users.service";

@Controller()
export class UsersController {
  
  constructor(private readonly userService: UserService){}

  @Post('user')
  async join(@Body('userName') userName: string){
    await this.userService.create(userName);
  }

}