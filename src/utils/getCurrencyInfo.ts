import axios from 'axios';
import { BASE_URL } from '../constants/baseUrl';
import { ICurrencyReasponseData } from '../types';

export const getCurrencyInfo = async (
  currency: string,
): Promise<ICurrencyReasponseData> => {
  const response = await axios.get(`${BASE_URL}/latest/${currency}`);
  const { base_code, conversion_rates, time_last_update_utc } =
    response.data as ICurrencyReasponseData;

  return {
    base_code,
    conversion_rates,
    time_last_update_utc,
  };
};
