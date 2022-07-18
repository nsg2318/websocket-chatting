"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitMessageDto = void 0;
class EmitMessageDto {
    constructor(message) {
        this.customDate = this.makeCustomDate(message.createdDate);
        this.userName = message.user.name;
        this.text = message.text;
    }
    makeCustomDate(date) {
        const month = date.getMonth();
        const day = date.getDay();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${month}/${day} ${hours}:${minutes}`;
    }
}
exports.EmitMessageDto = EmitMessageDto;
//# sourceMappingURL=emit-message.dto.js.map