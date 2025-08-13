import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { KeystrokeService } from './keystroke.service';
import { EventsService } from '../events/events.service';
export declare class KeystrokeGateway implements OnModuleInit {
    private readonly keystrokeService;
    private readonly eventsService;
    server: Server;
    constructor(keystrokeService: KeystrokeService, eventsService: EventsService);
    onModuleInit(): void;
    handleKeystroke(data: {
        key: string;
    }): Promise<void>;
}
