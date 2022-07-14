import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  name: string;
}