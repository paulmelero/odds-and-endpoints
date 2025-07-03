import type { OddsInfo } from '@odds-and-endpoints/types';

type OneOrMany<T> = T | T[];

export type Source = {
  [n: number]: {
    [m: number]: OneOrMany<OddsInfo>;
  };
};
