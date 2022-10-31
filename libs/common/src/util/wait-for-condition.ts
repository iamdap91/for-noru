import { sleep } from '@for-noru/common';

export const waitForCondition = (
  condition: (...params: any[]) => boolean,
  interval = 1000
) => {
  return new Promise<void>(async (resolve) => {
    for (let i = 0; i <= Number.MAX_SAFE_INTEGER; i++) {
      if (condition()) resolve();
      await sleep(interval);
    }
  });
};
