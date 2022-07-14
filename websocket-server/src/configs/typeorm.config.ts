import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Message } from "src/web-socket/messages/entities/message.entity";
import { Room } from "src/web-socket/rooms/entities/room.entity";

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'sunba',
  password: 'sunba',
  database: 'websocket',
  entities: [Message, Room,],
  synchronize: true,
};