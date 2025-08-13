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
exports.KeystrokeGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const keystroke_service_1 = require("./keystroke.service");
const events_service_1 = require("../events/events.service");
let KeystrokeGateway = class KeystrokeGateway {
    keystrokeService;
    eventsService;
    server;
    constructor(keystrokeService, eventsService) {
        this.keystrokeService = keystrokeService;
        this.eventsService = eventsService;
    }
    onModuleInit() {
        this.eventsService.keystrokeStatsUpdated$.subscribe((stats) => {
            this.server.emit('keystroke_stats', stats);
        });
    }
    async handleKeystroke(data) {
        await this.keystrokeService.addKeystroke(data.key);
    }
};
exports.KeystrokeGateway = KeystrokeGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], KeystrokeGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('keystroke'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KeystrokeGateway.prototype, "handleKeystroke", null);
exports.KeystrokeGateway = KeystrokeGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } }),
    __metadata("design:paramtypes", [keystroke_service_1.KeystrokeService,
        events_service_1.EventsService])
], KeystrokeGateway);
//# sourceMappingURL=keystroke.gateway.js.map