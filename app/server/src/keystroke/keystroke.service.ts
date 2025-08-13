import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keystroke } from './keystroke.entity';
import { EventsService } from '../events/events.service';

@Injectable()
export class KeystrokeService implements OnModuleInit {
  private keystrokeBuffer: Keystroke[] = [];
  private readonly BATCH_SIZE = 100;
  private readonly FLUSH_INTERVAL = 1000;

  constructor(
    @InjectRepository(Keystroke)
    private keystrokeRepository: Repository<Keystroke>,
    private readonly eventsService: EventsService,
  ) {}

  onModuleInit() {
    setInterval(() => this.flushBuffer(), this.FLUSH_INTERVAL);
  }

  async addKeystroke(key: string) {
    const keystroke = this.keystrokeRepository.create({ key });
    this.keystrokeBuffer.push(keystroke);

    if (this.keystrokeBuffer.length >= this.BATCH_SIZE) {
      await this.flushBuffer();
    }
  }

  private async flushBuffer() {
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
}