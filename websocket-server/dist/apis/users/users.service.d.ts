import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    saveIfNotExist(name: string): Promise<User>;
    saveSocketId(userId: number, socketId: string): Promise<void>;
    findUserBySocketId(sockets: Set<string>): Promise<User[]>;
    findSocketIdByUserId(userId: number): Promise<string>;
}
