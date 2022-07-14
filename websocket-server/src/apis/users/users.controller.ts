import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./users.service";

@Controller()
export class UserController {
  
  constructor(private readonly userService: UserService){}

  @Post('join')
  async join(@Body('name') name: string){
    await this.userService.create(name);
  }

}