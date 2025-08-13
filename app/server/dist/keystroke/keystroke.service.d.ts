import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Keystroke } from './keystroke.entity';
import { EventsService } from '../events/events.service';
export declare class KeystrokeService implements OnModuleInit {
    private keystrokeRepository;
    private readonly eventsService;
    private keystrokeBuffer;
    private readonly BATCH_SIZE;
    private readonly FLUSH_INTERVAL;
    constructor(keystrokeRepository: Repository<Keystroke>, eventsService: EventsService);
    onModuleInit(): void;
    addKeystroke(key: string): Promise<void>;
    private flushBuffer;
    getKeystrokeStatistics(): Promise<{
        totalCount: number;
        keyCounts: {
            key: any;
            count: number;
        }[];
    }>;
}
