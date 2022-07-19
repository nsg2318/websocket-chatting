"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const user_entity_1 = require("../apis/users/entities/user.entity");
const message_entity_1 = require("../web-socket/messages/entities/message.entity");
const room_entity_1 = require("../apis/rooms/entities/room.entity");
const roomuser_entity_1 = require("../apis/roomsusers/entities/roomuser.entity");
exports.typeORMConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'sunba',
    password: 'sunba',
    database: 'websocket',
    entities: [room_entity_1.Room, user_entity_1.User, message_entity_1.Message, roomuser_entity_1.RoomUser],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map