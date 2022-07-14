"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const message_entity_1 = require("../entities/message.entity");
class CreateMessageDto extends (0, mapped_types_1.PickType)(message_entity_1.Message, ['name', 'text']) {
}
exports.CreateMessageDto = CreateMessageDto;
//# sourceMappingURL=create-message.dto.js.map