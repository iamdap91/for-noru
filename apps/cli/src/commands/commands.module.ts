import { Module } from '@nestjs/common';
import { RestaurantsCommands } from './restaurants-commands';

@Module({
  imports: [],
  providers: [RestaurantsCommands],
})
export class CommandsModule {}
