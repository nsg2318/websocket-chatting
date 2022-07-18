import { Room } from "src/apis/rooms/entities/room.entity";
import { User } from "src/apis/users/entities/user.entity";
import { BaseEntity } from "typeorm";
export declare class Message extends BaseEntity {
    id: number;
    createdDate: Date;
    text: string;
    room: Room;
    user: User;
}
