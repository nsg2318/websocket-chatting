"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitMessageDto = void 0;
class EmitMessageDto {
    constructor(roomName, userName, message) {
        this.roomName = roomName;
        this.userName = userName;
        this.text = message.text;
    }
}
exports.EmitMessageDto = EmitMessageDto;
//# sourceMappingURL=emit-message.dto.js.map