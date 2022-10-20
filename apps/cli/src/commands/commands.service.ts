import { Injectable } from '@nestjs/common';

@Injectable()
export class CommandsService {
  getData(): { message: string } {
    return { message: 'Welcome to cli!' };
  }
}
