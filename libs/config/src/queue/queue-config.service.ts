import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BullModuleOptions, BullOptionsFactory } from '@nestjs/bull';

@Injectable()
export class QueueConfigService implements BullOptionsFactory {
  constructor(private configService: ConfigService) {}

  createBullOptions(): BullModuleOptions {
    return this.configService.get<BullModuleOptions>('queue');
  }
}
