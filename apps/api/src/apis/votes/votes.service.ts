import Redis from 'ioredis';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { VOTE_CAST_TYPE } from '@for-noru/common';
import { CreateVoteDto } from './dto';

@Injectable()
export class VotesService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async create({ code, deviceId, voteType, castType }: CreateVoteDto) {
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

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }
}
