import { Message } from "src/web-socket/messages/entities/message.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdDate: Date;

  @Column()
  name: string;

  @OneToMany((type) => Message, (message) => message.user)
  messages: Message[];
}