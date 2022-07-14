import { BaseEntity } from "typeorm";
export declare class Message extends BaseEntity {
    id: number;
    createdDate: Date;
    name: string;
    text: string;
    room: string;
}
