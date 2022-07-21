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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const rooms_service_1 = require("../../apis/rooms/rooms.service");
const users_service_1 = require("../../apis/users/users.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const create_room_dto_1 = require("./dto/create-room.dto");
const messages_service_1 = require("./messages.service");
let MessagesGateway = class MessagesGateway {
    constructor(messagesService, usersService, roomsService) {
        this.messagesService = messagesService;
        this.usersService = usersService;
        this.roomsService = roomsService;
    }
    async create(createMessageDto) {
        const createdMessage = await this.messagesService.create(createMessageDto);
        this.server.to(createMessageDto.roomId.toString()).emit('message', createdMessage);
        return createdMessage;
    }
    async findAllByRoom(roomId) {
        return await this.messagesService.findAllByRoom(roomId);
    }
    async createRoom(dto, client) {
        const createdRoom = await this.roomsService.save(dto);
        let participants = dto.participants;
        participants.push(dto.hostName);
        const socketIds = await this.usersService.findSocketIdArrayByUserName(participants);
        socketIds.map(socketId => this.server.to(socketId).emit('requestJoinRoom', createdRoom.id));
    }
    async justJoin(roomId, client) {
        console.log(`clientid : ${client.id}, roomId : ${roomId}`);
        await this.messagesService.joinRoom(roomId, client);
    }
    async saveSocket(userId, client) {
        return await this.usersService.saveSocketId(userId, client.id);
    }
    async getAllSocketUser(userName) {
        const sockets = await this.server.allSockets();
        const users = await this.usersService.findUserBySocketId(userName, sockets);
        return users;
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllMessageByRoomId'),
    __param(0, (0, websockets_1.MessageBody)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "findAllByRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createRoom'),
    __param(0, (0, websockets_1.MessageBody)('dto')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomGatewayDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "createRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('justJoin'),
    __param(0, (0, websockets_1.MessageBody)('roomId')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "justJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('saveSocketId'),
    __param(0, (0, websockets_1.MessageBody)('userId')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "saveSocket", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getAllSocketUser'),
    __param(0, (0, websockets_1.MessageBody)('userName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "getAllSocketUser", null);
MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: {
            origin: 'http://localhost:3000',
        },
    }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        users_service_1.UsersService,
        rooms_service_1.RoomsService])
], MessagesGateway);
exports.MessagesGateway = MessagesGateway;
//# sourceMappingURL=messages.gateway.js.map