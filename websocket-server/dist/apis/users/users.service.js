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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async saveIfNotExist(name) {
        if (!name) {
            throw new common_1.UnauthorizedException('닉네임을 입력해주세요.');
        }
        let user = await this.usersRepository.findByName(name);
        if (!user) {
            user = await this.usersRepository.saveByName(name);
        }
        return user;
    }
    async saveSocketId(userId, socketId) {
        await this.usersRepository.updateSocketIdByUserId(userId, socketId);
    }
    async findUserBySocketId(userName, sockets) {
        const socketsArr = Array.from(sockets);
        let userArr = [];
        for (let i = 0; i < socketsArr.length; i++) {
            const socket = socketsArr[i];
            const user = await this.usersRepository.findBySocketId(socket);
            if (user) {
                userArr.push(user);
            }
        }
        const hostIndex = userArr.findIndex(obj => obj.name == userName);
        userArr.splice(hostIndex, 1);
        return userArr;
    }
    async findSocketIdByUserId(userId) {
        const user = await this.usersRepository.findById(userId);
        return user.socketId;
    }
    async findSocketIdArrayByUserName(userNameList) {
        let socketIdArray = [];
        for (const name of userNameList) {
            const user = await this.usersRepository.findByName(name);
            socketIdArray.push(user.socketId);
        }
        return socketIdArray;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map