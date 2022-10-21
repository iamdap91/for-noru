import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '@gong-gu/models';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [RestaurantsService],
  exports: [RestaurantsService],
})
export class BackendRestaurantsModule {}
