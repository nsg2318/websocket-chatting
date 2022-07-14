import { UserService } from "./users.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    join(name: string): Promise<void>;
}
