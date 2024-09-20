import Select, { StylesConfig } from 'react-select';

import { IOption } from '../../types';

import styles from './CurrencyAmountBlock.module.scss';
import { useState } from 'react';

type Props = {
  blockName: 'have' | 'receive';
  options: IOption[];
};

const customStyles: StylesConfig<IOption, false> = {
  control: provided => ({
    ...provided,
    width: 'max-content',
    border: 'none',

    fontSize: '24px',
    outline: 'none',
    borderColor: 'transparent',
    boxShadow: 'none',
  }),
  menu: provided => ({
    ...provided,
    width: '100%',
    border: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#01966b'
      : state.isFocused
        ? '#01966b'
        : provided.backgroundColor,
  }),
};

export const CurrencyAmountBlock: React.FC<Props> = ({
  blockName,
  options,
}) => {
  const [amount, setAmount] = useState<number | ''>(0);
  const isReceived = blockName === 'receive';

  const hangleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const isValid = +inputValue;

    if (isValid) {
      setAmount(+inputValue);
    }

    if (inputValue === '') {
      setAmount('');
    }
  };

  return (
    <div className={styles.container}>
      <p>You {blockName} </p>
      <div className={styles.choose}>
        <input
          type="text"
          value={amount}
          onChange={hangleChangeAmount}
          className={styles.input}
          placeholder="Enter number..."
        />
        <Select
          options={options}
          name="currency"
          isMulti={false}
          defaultValue={options[0]}
          styles={customStyles}
          isSearchable={false}
        />
      </div>
      <p>1 USD = 41.25 UAH</p>
    </div>
  );
};
