import { Message } from "../entities/message.entity";
declare const CreateMessageDto_base: import("@nestjs/mapped-types").MappedType<Pick<Message, "text" | "name">>;
export declare class CreateMessageDto extends CreateMessageDto_base {
}
export {};
