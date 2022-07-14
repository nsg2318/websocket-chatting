import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateMessageDto } from "../dto/create-message.dto";

@Entity()
export class Message extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdDate: Date;
  @Column()
  name: string;
  @Column()
  text: string;
  @Column()
  room: string;
}
