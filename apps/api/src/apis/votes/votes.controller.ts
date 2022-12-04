import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto';

@ApiTags('votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }

  @Get(':id')
  figurePercentages(@Param('id') id: string) {
    return this.votesService.figurePercentages(id);
  }
}
