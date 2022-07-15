import { Message } from "src/web-socket/messages/entities/message.entity";
import { BaseEntity } from "typeorm";
export declare class Room extends BaseEntity {
    id: string;
    createdDate: Date;
    name: string;
    messages: Message[];
}
