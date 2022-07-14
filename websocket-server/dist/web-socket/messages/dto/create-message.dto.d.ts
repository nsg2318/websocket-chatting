import { Message } from "../entities/message.entity";
declare const CreateMessageDto_base: import("@nestjs/mapped-types").MappedType<Pick<Message, "name" | "text">>;
export declare class CreateMessageDto extends CreateMessageDto_base {
}
export {};
