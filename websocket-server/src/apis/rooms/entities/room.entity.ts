import { Message } from "src/web-socket/messages/entities/message.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdDate: Date;
  
  @Column()
  name: string;

  @OneToMany((type) => Message, (message) => message.room)
  messages: Message[];
  
}