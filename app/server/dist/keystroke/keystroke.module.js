"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeystrokeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const keystroke_service_1 = require("./keystroke.service");
const keystroke_gateway_1 = require("./keystroke.gateway");
const keystroke_controller_1 = require("./keystroke.controller");
const keystroke_entity_1 = require("./keystroke.entity");
const events_service_1 = require("../events/events.service");
let KeystrokeModule = class KeystrokeModule {
};
exports.KeystrokeModule = KeystrokeModule;
exports.KeystrokeModule = KeystrokeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([keystroke_entity_1.Keystroke])
        ],
        controllers: [keystroke_controller_1.KeystrokeController],
        providers: [
            keystroke_service_1.KeystrokeService,
            keystroke_gateway_1.KeystrokeGateway,
            events_service_1.EventsService
        ],
    })
], KeystrokeModule);
//# sourceMappingURL=keystroke.module.js.map