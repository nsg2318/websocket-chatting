import { Room } from "src/apis/rooms/entities/room.entity";
import { User } from "src/apis/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  text: string;

  @ManyToOne((type) => Room, (room) => room.messages)
  room: Room;

  @ManyToOne((type) => User, (user) => user.messages, {eager: true})
  user: User;
}
