import { CreateMessageDto } from "../dto/create-message.dto";
export declare class Message {
    time: number;
    name: string;
    text: string;
    constructor(createMessageDto: CreateMessageDto, name: string);
}
