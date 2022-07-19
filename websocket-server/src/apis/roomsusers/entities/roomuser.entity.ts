import { Room } from "src/apis/rooms/entities/room.entity";
import { User } from "src/apis/users/entities/user.entity";
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoomUser extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne((type) => Room, (room) => room.roomUsers, {eager: true})
  room: Room;

  @ManyToOne((type) => User, (user) => user.roomUsers)
  user: User;
}