import { RoomUser } from "src/apis/roomsusers/entities/roomuser.entity";
import { Message } from "src/web-socket/messages/entities/message.entity";
import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    createdDate: Date;
    name: string;
    messages: Message[];
    roomUsers: RoomUser[];
}
