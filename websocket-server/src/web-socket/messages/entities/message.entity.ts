import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { CreateMessageDto } from "../dto/create-message.dto";

export class Message extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  time: number;
  name: string;
  text: string;

  constructor(createMessageDto: CreateMessageDto, name: string){
    this.name = name;
    this.text = createMessageDto.text;
    this.time = Date.now();
  }
}
