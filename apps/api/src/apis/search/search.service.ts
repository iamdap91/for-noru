import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  find() {
    return `This action returns all search`;
  }
}
