import { roundToTwo } from './roundToTwo';

export const calculateAmount = (amount: number, rate: number): number =>
  amount * roundToTwo(rate);
