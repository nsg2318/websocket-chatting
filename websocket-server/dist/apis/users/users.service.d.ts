import { UserRepository } from "./users.repository";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    saveIfNotExist(name: string): Promise<void>;
}
