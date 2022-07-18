import { Message } from "../entities/message.entity";

export class EmitMessageDto {
    customDate: string;
    userName: string;
    text: string;

    constructor(message: Message) {
        this.customDate = this.makeCustomDate(message.createdDate);
        this.userName = message.user.name;
        this.text = message.text;
    }

    private makeCustomDate(date: Date): string{    

        const month = date.getMonth();
        const day = date.getDay();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        return `${month}/${day} ${hours}:${minutes}`; 
    }
  }