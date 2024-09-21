import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';
import {
  Converter,
  ErrorPage,
  Header,
  Loader,
  Notification,
} from '../components';
import { useCurrencyState, useDispatch } from '../hooks';
import { getCurrencyInfo } from '../utils';
import { MAIN_CURRENCIES } from '../constants';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { mainCurrency } = useCurrencyState();
  const [hasError, setHasError] = useState(false);

  const hasLoader = !mainCurrency && !hasError;

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
      } catch (error) {
        setHasError(true);

        const errorMessage =
          error instanceof Error ? error.message : 'something went wrong';

        toast.error(errorMessage);
      }
    })();
  }, [dispatch]);

  if (hasError) {
    return (
      <>
        <ErrorPage />
        <Notification />
      </>
    );
  }

  return hasLoader ? (
    <Loader />
  ) : (
    <>
      <Header />
      <Converter />
      <Notification />
    </>
  );
};
