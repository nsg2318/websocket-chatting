import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    join(userName: string): Promise<User>;
}
