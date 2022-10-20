import { CommandsModule } from './commands/commands.module';
import { CommandFactory } from 'nest-commander';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    await CommandFactory.run(CommandsModule, ['log', 'warn', 'error']);
  } catch (e) {
    Logger.error(e);
  } finally {
    process.exit(0);
  }
}

bootstrap();
