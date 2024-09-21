import { useState } from 'react';
import change from '../../assets/icons/exchange.svg';

import { CurrencyAmountBlock } from '../CurrencyAmountBlock';
import { useCurrencyState } from '../../hooks';
import { BlockName } from '../../types';
import { calculateAmount } from '../../utils';

import styles from './Converter.module.scss';

export const Converter = () => {
  const { haveCurrency, receiveCurrency } = useCurrencyState();

  const [haveAmount, setHaveAmount] = useState<string>('0');
  const [receiveAmount, setReceiveAmount] = useState<string>('0');

  const handleAmountChange = (value: string, fromType: BlockName) => {
    if (!haveCurrency || !receiveCurrency) {
      return;
    }

    if (value) {
      const numericValue = parseFloat(value);

      if (fromType === 'have') {
        const convertedValue = calculateAmount(
          numericValue,
          haveCurrency.conversion_rates[receiveCurrency.base_code],
        );
        setHaveAmount(value);
        setReceiveAmount(String(convertedValue));
      } else {
        const convertedValue = calculateAmount(
          numericValue,
          receiveCurrency.conversion_rates[haveCurrency.base_code],
        );
        setReceiveAmount(value);
        setHaveAmount(String(convertedValue));
      }
    } else {
      setHaveAmount('');
      setReceiveAmount('');
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.converterSection}>
        <CurrencyAmountBlock
          blockName="have"
          amount={haveAmount}
          hangleConvert={handleAmountChange}
        />

        <img
          className={styles.changeImg}
          src={change}
          alt="change button"
        />

        <CurrencyAmountBlock
          blockName="receive"
          amount={receiveAmount}
          hangleConvert={handleAmountChange}
        />
      </section>
    </main>
  );
};
