"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const roomsUsers_repository_1 = require("../roomsusers/roomsUsers.repository");
const users_repository_1 = require("../users/users.repository");
const rooms_repository_1 = require("./rooms.repository");
let RoomsService = class RoomsService {
    constructor(roomsRepository, usersRepository, roomsUsersRepository) {
        this.roomsRepository = roomsRepository;
        this.usersRepository = usersRepository;
        this.roomsUsersRepository = roomsUsersRepository;
    }
    async save(createRoomDto) {
        const { roomName, hostName } = createRoomDto;
        if (!roomName) {
            throw new common_1.UnauthorizedException('방이름을 입력해주세요.');
        }
        const room = await this.roomsRepository.findByName(roomName);
        if (room) {
            throw new common_1.UnauthorizedException('이미 존재하는 방이름입니다.');
        }
        const createdRoom = await this.roomsRepository.save(roomName, hostName);
        const user = await this.usersRepository.findByName(hostName);
        await this.roomsUsersRepository.save(user, createdRoom);
        return createdRoom;
    }
};
RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rooms_repository_1.RoomsRepository,
        users_repository_1.UsersRepository,
        roomsUsers_repository_1.RoomsUsersRepository])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map