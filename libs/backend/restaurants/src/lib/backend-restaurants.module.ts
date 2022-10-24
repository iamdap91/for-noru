import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '@gong-gu/models';
import { BullModule } from '@nestjs/bull';
import { QueueConfigService } from '@gong-gu/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    BullModule.registerQueueAsync({
      name: 'restaurants',
      useClass: QueueConfigService,
    }),
  ],
  providers: [RestaurantsService],
  exports: [RestaurantsService],
})
export class BackendRestaurantsModule {}
