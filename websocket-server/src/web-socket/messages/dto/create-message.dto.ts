import { PickType } from "@nestjs/mapped-types";
import { Message } from "../entities/message.entity";

export class CreateMessageDto {
  roomId: number;
  text: string;
  userName: string;
}
