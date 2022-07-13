"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(createMessageDto, name) {
        this.name = name;
        this.text = createMessageDto.text;
        this.time = Date.now();
    }
}
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map