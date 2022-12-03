import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchPlaceQuery } from './dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  find(@Query() query: SearchPlaceQuery) {
    return this.searchService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchService.findOne(id);
  }
}
