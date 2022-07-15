import { Message } from "../entities/message.entity";
export declare class EmitMessageDto {
    roomName: string;
    text: string;
    userName: string;
    constructor(roomName: string, userName: string, message: Message);
}
