import { useEffect } from 'react';
import { Converter, Header, Loader } from '../components';
import { useCurrencyState, useDispatch } from '../hooks';
import { getCurrencyInfo } from '../utils';
import { MAIN_CURRENCIES } from '../constants';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { mainCurrency } = useCurrencyState();

  const hasLoader = !mainCurrency;

  useEffect(() => {
    (async () => {
      try {
        const uahInfo = await getCurrencyInfo(MAIN_CURRENCIES.UAH);

        if (uahInfo) {
          dispatch({
            type: 'setMainCurrency',
            payload: uahInfo,
          });
        }
      } catch (error) {}
    })();
  }, []);

  return hasLoader ? (
    <Loader />
  ) : (
    <>
      <Header />
      <Converter />
    </>
  );
};
