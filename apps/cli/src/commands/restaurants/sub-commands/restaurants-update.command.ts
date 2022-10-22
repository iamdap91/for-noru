import { CommandRunner, SubCommand } from 'nest-commander';
import { Logger } from '@nestjs/common';

@SubCommand({ name: 'update', description: '음식점 업데이트' })
export class RestaurantsUpdateCommand extends CommandRunner {
  // todo 나중에 업데이트하는거 추가하자. 폐업 여부만 체크하면 될듯
  async run() {
    Logger.log('update-restaurants');
  }
}
