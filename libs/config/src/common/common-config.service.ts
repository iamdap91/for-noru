/** 환경변수 서비스 */
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import commonConfig from './common.config';

@Injectable()
export class CommonConfigService {
  constructor(
    @Inject(commonConfig.KEY)
    private readonly config: ConfigType<typeof commonConfig>
  ) {}

  get port() {
    return this.config.PORT;
  }

  get nodeEnv() {
    return this.config.NODE_ENV;
  }

  get isProduction() {
    return this.config.IS_PRODUCTION;
  }
}
