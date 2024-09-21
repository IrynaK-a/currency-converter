import { MAIN_CURRENCIES } from '../../constants';
import { useCurrencyState } from '../../hooks';
import { roundToTwo } from '../../utils';

import styles from './MainCurrencyToUAHSection.module.scss';

export const MainCurrencyToUAHSection = () => {
  const { mainCurrency } = useCurrencyState();

  const usdSum = mainCurrency
    ? roundToTwo(1 / mainCurrency.conversion_rates[MAIN_CURRENCIES.USD])
    : '';
  const eurSum = mainCurrency
    ? roundToTwo(1 / mainCurrency.conversion_rates[MAIN_CURRENCIES.EUR])
    : '';

  return (
    <section className={styles.infoSection}>
      <div className={styles.currencyBlock}>
        <p className={styles.currency}>
          {MAIN_CURRENCIES.USD}/{MAIN_CURRENCIES.UAH}:
        </p>
        <span>{usdSum}$</span>
      </div>

      <div className={styles.currencyBlock}>
        <p className={styles.currency}>
          {MAIN_CURRENCIES.EUR}/{MAIN_CURRENCIES.UAH}:
        </p>
        <span>{eurSum}€</span>
      </div>
    </section>
  );
};
