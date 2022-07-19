import { type } from "os";
import { RoomUser } from "src/apis/roomsusers/entities/roomuser.entity";
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
  
  @OneToMany((type) => RoomUser, (roomUser) => roomUser.room)
  roomUsers: RoomUser[];
}