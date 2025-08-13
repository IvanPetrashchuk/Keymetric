import { Controller, Get } from '@nestjs/common';
import { KeystrokeService } from './keystroke.service';

@Controller('keystroke')
export class KeystrokeController {
  constructor(private readonly keystrokeService: KeystrokeService) {}

  @Get('stats')
  async getKeystrokeStats() {
    return this.keystrokeService.getKeystrokeStatistics();
  }
}