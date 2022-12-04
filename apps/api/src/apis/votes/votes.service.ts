import Redis from 'ioredis';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { VOTE_CAST_TYPE, VOTE_TYPE } from '@for-noru/common';
import { CreateVoteDto } from './dto';

@Injectable()
export class VotesService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async create({ id, deviceId, voteType, castType }: CreateVoteDto) {
    const key = `${id}:${deviceId}:${voteType}`;

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
    const vote = (await this.redis.hget('votes', `${id}:${voteType}`)) || '0|0';
    let [allowed, notAllowed] = vote.split('|').map((item) => +item);
    castType === VOTE_CAST_TYPE.INCREMENT ? (allowed += 1) : (notAllowed += 1);

    await this.redis.hset(
      'votes',
      `${id}:${voteType}`,
      `${allowed}|${notAllowed}`
    );
  }

  async figurePercentages(id: string) {
    const votes = await Promise.all([
      this.redis.hget('votes', `${id}:${VOTE_TYPE.SMALL}`),
      this.redis.hget('votes', `${id}:${VOTE_TYPE.MIDDLE}`),
      this.redis.hget('votes', `${id}:${VOTE_TYPE.BIG}`),
      this.redis.hget('votes', `${id}:${VOTE_TYPE.SEPARATED}`),
    ]);

    return votes.map((vote) => {
      const [allowed, notAllowed] = (vote || '0|0')
        .split('|')
        .map((item) => +item);
      return allowed / (allowed + notAllowed) || 0;
    });
  }
}
