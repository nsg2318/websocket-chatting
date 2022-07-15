import { Message } from "../entities/message.entity";

export class EmitMessageDto {
    roomName: string;
    text: string;
    userName: string;

    constructor(roomName: string, userName: string, message: Message) {
        this.roomName = roomName;
        this.userName = userName;
        this.text = message.text;
    }
  }