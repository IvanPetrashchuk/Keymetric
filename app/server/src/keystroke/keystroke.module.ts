import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeystrokeService } from './keystroke.service';
import { KeystrokeGateway } from './keystroke.gateway';
import { KeystrokeController } from './keystroke.controller';
import { Keystroke } from './keystroke.entity';
import { EventsService } from '../events/events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Keystroke]) 
  ],
  controllers: [KeystrokeController],
  providers: [
    KeystrokeService, 
    KeystrokeGateway,
    EventsService   
  ],
})
export class KeystrokeModule {}