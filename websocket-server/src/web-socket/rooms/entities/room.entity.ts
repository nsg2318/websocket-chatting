import { Message } from "src/web-socket/messages/entities/message.entity";
import { BaseEntity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Room extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdDate: Date;
  
  name: string;

  @OneToMany((type) => Message, (message) => message.room)
  messages: Message[];
  
}