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
exports.Keystroke = void 0;
const typeorm_1 = require("typeorm");
let Keystroke = class Keystroke {
    id;
    key;
    timestamp;
};
exports.Keystroke = Keystroke;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Keystroke.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Keystroke.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Keystroke.prototype, "timestamp", void 0);
exports.Keystroke = Keystroke = __decorate([
    (0, typeorm_1.Entity)()
], Keystroke);
//# sourceMappingURL=keystroke.entity.js.map