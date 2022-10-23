import { CommandRunner, SubCommand } from 'nest-commander';

@SubCommand({
  name: 'restaurants',
  arguments: '[code]',
  description: '네이버 크롤링해서 반려동물 동반인지 체크',
})
export class QueuePushRestaurantsCommand extends CommandRunner {
  async run([code]: string[]) {
    console.log(code);
  }
}
