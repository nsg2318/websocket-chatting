import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export class Room extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;
  
  name: string;
}