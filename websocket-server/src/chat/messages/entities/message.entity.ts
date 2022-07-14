import { CreateMessageDto } from "../dto/create-message.dto";

export class Message {
  time: number;
  name: string;
  text: string;

  constructor(createMessageDto: CreateMessageDto, name: string){
    this.name = name;
    this.text = createMessageDto.text;
    this.time = Date.now();
  }
}
