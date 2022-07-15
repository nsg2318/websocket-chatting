import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
export declare class UserRepository {
    private userRepository;
    constructor(userRepository: Repository<User>);
    join(name: string): Promise<User>;
    findByName(name: string): Promise<User>;
}
