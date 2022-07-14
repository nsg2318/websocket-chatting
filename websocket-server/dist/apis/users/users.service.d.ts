import { UserRepository } from "./users.repository";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(name: string): Promise<void>;
}
