import { IOption } from '../types';

export const createOptions = (codes: string[]): IOption[] =>
  codes.map<IOption>(el => ({
    label: el,
    value: el,
  }));
