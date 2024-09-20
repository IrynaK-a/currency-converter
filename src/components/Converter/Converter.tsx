import change from '../../assets/icons/exchange.svg';

import { CurrencyAmountBlock } from '../CurrencyAmountBlock';
import { IOption } from '../../types';

import styles from './Converter.module.scss';

export const Converter = () => {
  const options: IOption[] = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'UAH', label: 'UAH' },
  ];

  return (
    <main className={styles.main}>
      <section className={styles.converterSection}>
        <CurrencyAmountBlock
          blockName="have"
          options={options}
        />

        <button>
          <img
            className={styles.changeImg}
            src={change}
            alt="change button"
          />
        </button>

        <CurrencyAmountBlock
          blockName="receive"
          options={options}
        />
      </section>
    </main>
  );
};
