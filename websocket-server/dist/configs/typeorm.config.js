"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const message_entity_1 = require("../web-socket/messages/entities/message.entity");
const room_entity_1 = require("../web-socket/rooms/entities/room.entity");
exports.typeORMConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'sunba',
    password: 'sunba',
    database: 'websocket',
    entities: [message_entity_1.Message, room_entity_1.Room,],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map