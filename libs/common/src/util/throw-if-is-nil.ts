import { throwIf } from './throw-if';
import { isNil } from '@nestjs/common/utils/shared.utils';

interface ThrowIfIsNil {
  <T>(err: Error, value: T | null | undefined): T;
  <T>(err: Error): (value: T | null | undefined) => T;
}

export const throwIfIsNil: ThrowIfIsNil = <T>(err: Error, value?: T | null) => {
  const exec = throwIf<T>((v) => isNil(v), err);

  if (value) {
    return exec(value);
  }

  return exec;
};
