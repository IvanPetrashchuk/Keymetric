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
exports.KeystrokeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const keystroke_entity_1 = require("./keystroke.entity");
const events_service_1 = require("../events/events.service");
let KeystrokeService = class KeystrokeService {
    keystrokeRepository;
    eventsService;
    keystrokeBuffer = [];
    BATCH_SIZE = 100;
    FLUSH_INTERVAL = 1000;
    constructor(keystrokeRepository, eventsService) {
        this.keystrokeRepository = keystrokeRepository;
        this.eventsService = eventsService;
    }
    onModuleInit() {
        setInterval(() => this.flushBuffer(), this.FLUSH_INTERVAL);
    }
    async addKeystroke(key) {
        const keystroke = this.keystrokeRepository.create({ key });
        this.keystrokeBuffer.push(keystroke);
        if (this.keystrokeBuffer.length >= this.BATCH_SIZE) {
            await this.flushBuffer();
        }
    }
    async flushBuffer() {
        if (this.keystrokeBuffer.length === 0) {
            return;
        }
        const dataToSave = [...this.keystrokeBuffer];
        this.keystrokeBuffer = [];
        await this.keystrokeRepository.save(dataToSave);
        console.log(`Saved ${dataToSave.length} keystrokes to DB.`);
        const stats = await this.getKeystrokeStatistics();
        this.eventsService.emitKeystrokeStats(stats);
    }
    async getKeystrokeStatistics() {
        const results = await this.keystrokeRepository
            .createQueryBuilder('keystroke')
            .select('keystroke.key', 'key')
            .addSelect('COUNT(keystroke.key)', 'count')
            .groupBy('keystroke.key')
            .orderBy('count', 'DESC')
            .getRawMany();
        const totalCount = await this.keystrokeRepository.count();
        return {
            totalCount,
            keyCounts: results.map(result => ({
                key: result.key,
                count: parseInt(result.count, 10),
            })),
        };
    }
};
exports.KeystrokeService = KeystrokeService;
exports.KeystrokeService = KeystrokeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(keystroke_entity_1.Keystroke)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        events_service_1.EventsService])
], KeystrokeService);
//# sourceMappingURL=keystroke.service.js.map