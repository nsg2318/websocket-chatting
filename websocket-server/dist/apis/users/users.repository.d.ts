import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
export declare class UserRepository {
    private userRepository;
    constructor(userRepository: Repository<User>);
    saveByName(name: string): void;
    findByName(name: string): Promise<User>;
}
