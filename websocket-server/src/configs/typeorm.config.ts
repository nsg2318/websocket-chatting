import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/apis/users/entities/user.entity";
import { Message } from "src/web-socket/messages/entities/message.entity";
import { Room } from "src/apis/rooms/entities/room.entity";

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'sunba',
  password: 'sunba',
  database: 'websocket',
  entities: [Room,User,Message],
  synchronize: true,
};