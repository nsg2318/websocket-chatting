import { Message } from "../entities/message.entity";
export declare class EmitMessageDto {
    customDate: string;
    userName: string;
    text: string;
    constructor(message: Message);
    private makeCustomDate;
}
