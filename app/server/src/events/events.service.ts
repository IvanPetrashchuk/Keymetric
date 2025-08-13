import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class EventsService {
  private keystrokeStatsUpdatedSource = new Subject<any>();
  keystrokeStatsUpdated$ = this.keystrokeStatsUpdatedSource.asObservable();

  emitKeystrokeStats(stats: any) {
    this.keystrokeStatsUpdatedSource.next(stats);
  }
}