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
const rooms_repository_1 = require("../../apis/rooms/rooms.repository");
const users_repository_1 = require("../../apis/users/users.repository");
const emit_message_dto_1 = require("./dto/emit-message.dto");
const meesages_repository_1 = require("./meesages.repository");
let MessagesService = class MessagesService {
    constructor(messagesRepository, usersRepository, roomRepository) {
        this.messagesRepository = messagesRepository;
        this.usersRepository = usersRepository;
        this.roomRepository = roomRepository;
    }
    async findAllByRoom(roomId) {
        const messages = await this.messagesRepository.findAllByRoom(roomId);
        const emitResult = messages.map((message) => new emit_message_dto_1.EmitMessageDto(message));
        return emitResult;
    }
    async joinRoom(roomId, client) {
        await client.join(roomId.toString());
    }
    async create(createMessageDto) {
        const { roomId, text, userName } = createMessageDto;
        const room = await this.roomRepository.findById(roomId);
        const user = await this.usersRepository.findByName(userName);
        const message = await this.messagesRepository.saveMessage(room, user, text);
        return new emit_message_dto_1.EmitMessageDto(message);
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [meesages_repository_1.MessagesRepository,
        users_repository_1.UsersRepository,
        rooms_repository_1.RoomsRepository])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map