"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const user_entity_1 = require("../apis/users/entities/user.entity");
const room_entity_1 = require("../web-socket/rooms/entities/room.entity");
exports.typeORMConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'sunba',
    password: 'sunba',
    database: 'websocket',
    entities: [room_entity_1.Room, user_entity_1.User],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map