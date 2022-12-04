import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Place } from '@for-noru/models';
import { InjectRepository } from '@nestjs/typeorm';
import { throwIfIsNil, VOTE_CAST_TYPE } from '@for-noru/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { UpdatePlaceDto, VoteDto } from './dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,
    @InjectRedis() private readonly redis: Redis
  ) {}

  async find() {
    return await this.placeRepo.find({ take: 100 });
  }

  async findOne(id: number) {
    return await this.placeRepo
      .findOne({ where: { id } })
      .then(throwIfIsNil(new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)));
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    const place = await this.placeRepo
      .findOne({ where: { id } })
      .then(throwIfIsNil(new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)));

    await this.placeRepo.save({ ...place, ...updatePlaceDto });
    // todo queue es 업데이트큐에 집어넣자
  }

  async remove(id: number) {
    const place = await this.placeRepo
      .findOne({ where: { id } })
      .then(throwIfIsNil(new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)));

    await this.placeRepo.save({ ...place, active: false });
    // todo queue es 업데이트큐에 집어넣자
  }

  async vote({ code, deviceId, voteType, castType }: VoteDto) {
    const key = `${code}:${deviceId}:${voteType}`;

    // 투표 여부 체크
    const isMember = await this.redis.sismember('voters', key);
    if (isMember) {
      throw new HttpException(
        '해당 항목은 이미 투표하셨습니다.',
        HttpStatus.BAD_REQUEST
      );
    }
    await this.redis.sadd('voters', key);

    // 투표 결과 반영
    const vote = (await this.redis.hget('votes', `${code}`)) || '0|0';
    let [allowed, notAllowed] = vote.split('|').map((item) => +item);
    castType === VOTE_CAST_TYPE.INCREMENT ? (allowed += 1) : (notAllowed += 1);

    await this.redis.hset(
      'votes',
      `${code}:${voteType}`,
      `${allowed}|${notAllowed}`
    );
  }
}
