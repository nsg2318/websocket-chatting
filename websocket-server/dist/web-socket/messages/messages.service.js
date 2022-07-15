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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const rooms_repository_1 = require("../../apis/rooms/rooms.repository");
const users_repository_1 = require("../../apis/users/users.repository");
const emit_message_dto_1 = require("./dto/emit-message.dto");
const meesages_repository_1 = require("./meesages.repository");
let MessagesService = class MessagesService {
    constructor(messageRepository, userRepository, roomRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }
    async findAllByRoom(roomId) {
        return await this.messageRepository.findAllByRoom(roomId);
    }
    async joinRoom(roomId, client) {
        await client.join(roomId.toString());
    }
    async create(createMessageDto, client) {
        const { roomId, text, userName } = createMessageDto;
        const room = await this.roomRepository.findById(roomId);
        const user = await this.userRepository.findByName(userName);
        const message = await this.messageRepository.saveMessage(room, user, text);
        return new emit_message_dto_1.EmitMessageDto(room.name, userName, message);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesService.prototype, "server", void 0);
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [meesages_repository_1.MessageRepository,
        users_repository_1.UserRepository,
        rooms_repository_1.RoomsRepository])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map