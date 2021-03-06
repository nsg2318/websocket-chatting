"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roomsUsers_module_1 = require("../roomsusers/roomsUsers.module");
const users_module_1 = require("../users/users.module");
const room_entity_1 = require("./entities/room.entity");
const rooms_repository_1 = require("./rooms.repository");
const rooms_service_1 = require("./rooms.service");
let RoomsModule = class RoomsModule {
};
RoomsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([room_entity_1.Room]), (0, common_1.forwardRef)(() => roomsUsers_module_1.RoomsUsersModule), users_module_1.UserModule],
        providers: [rooms_service_1.RoomsService, rooms_repository_1.RoomsRepository],
        exports: [rooms_repository_1.RoomsRepository, rooms_service_1.RoomsService],
    })
], RoomsModule);
exports.RoomsModule = RoomsModule;
//# sourceMappingURL=rooms.module.js.map