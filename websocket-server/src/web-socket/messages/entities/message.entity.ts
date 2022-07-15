import { User } from "src/apis/users/entities/user.entity";
import { Room } from "src/apis/rooms/entities/room.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateMessageDto } from "../dto/create-message.dto";

@Entity()
export class Message extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdDate: Date;

  @Column()
  text: string;

  @ManyToOne((type) => Room, (room) => room.messages)
  room: Room;

  @ManyToOne((type) => User, (user) => user.messages)
  user: User;
}
