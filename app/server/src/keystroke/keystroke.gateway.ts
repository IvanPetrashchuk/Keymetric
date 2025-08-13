import { OnModuleInit, Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { KeystrokeService } from './keystroke.service';
import { EventsService } from '../events/events.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class KeystrokeGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly keystrokeService: KeystrokeService,
    private readonly eventsService: EventsService,
  ) {}

  onModuleInit() {
    this.eventsService.keystrokeStatsUpdated$.subscribe((stats) => {
      this.server.emit('keystroke_stats', stats);
    });
  }

  @SubscribeMessage('keystroke')
  async handleKeystroke(@MessageBody() data: { key: string }) {
    await this.keystrokeService.addKeystroke(data.key);
  }
}
