import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
export declare class UsersRepository {
    private userRepository;
    constructor(userRepository: Repository<User>);
    saveByName(name: string): Promise<User>;
    findByName(name: string): Promise<User>;
    findById(userId: number): Promise<User>;
    updateSocketIdByUserId(userId: number, socketId: string): Promise<import("typeorm").UpdateResult>;
    findBySocketId(socketId: string): Promise<User>;
}
