import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { CreateMessageDto } from "../dto/create-message.dto";

export class Message extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;
  @Column()
  name: string;
  @Column()
  text: string;
}
