"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./apis/users/users.module");
const typeorm_config_1 = require("./configs/typeorm.config");
const messages_module_1 = require("./web-socket/messages/messages.module");
const rooms_module_1 = require("./apis/rooms/rooms.module");
const roomsUsers_module_1 = require("./apis/roomsusers/roomsUsers.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [messages_module_1.MessagesModule, rooms_module_1.RoomsModule, users_module_1.UserModule, roomsUsers_module_1.RoomsUsersModule, typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeORMConfig)],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map