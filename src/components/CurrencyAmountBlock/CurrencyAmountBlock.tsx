import Select, { SingleValue, StylesConfig } from 'react-select';
import { toast } from 'react-toastify';

import { BlockName, IOption } from '../../types';

import styles from './CurrencyAmountBlock.module.scss';
import { useMemo } from 'react';
import { useCurrencyState, useDispatch } from '../../hooks';
import { createCodes, createOptions, getCurrencyInfo } from '../../utils';
import { ERROR_MESSAGE, MAIN_CURRENCIES } from '../../constants';
import { roundToThree } from '../../utils/roundToTwo';

type Props = {
  blockName: BlockName;
  amount: string;
  hangleConvert: (value: string, fromType: BlockName) => void;
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
  amount,
  hangleConvert,
}) => {
  const { mainCurrency, haveCurrency, receiveCurrency } = useCurrencyState();
  const dispatch = useDispatch();

  const isHaveBlock = blockName === 'have';

  const options = useMemo(() => {
    if (!mainCurrency) {
      return [];
    }

    const codes = createCodes(mainCurrency.conversion_rates);

    return createOptions(codes);
  }, [mainCurrency]);

  const defaultOption: IOption = useMemo(
    () => ({
      label: mainCurrency ? mainCurrency.base_code : MAIN_CURRENCIES.UAH,
      value: mainCurrency ? mainCurrency.base_code : MAIN_CURRENCIES.UAH,
    }),
    [mainCurrency],
  );

  const currencyRateValue = useMemo(() => {
    if (!haveCurrency || !receiveCurrency) {
      return '';
    }

    const haveCurrencyCode = isHaveBlock
      ? haveCurrency.base_code
      : receiveCurrency.base_code;
    const receiveCurrencyCode = isHaveBlock
      ? receiveCurrency.base_code
      : haveCurrency.base_code;
    const currencyRate = isHaveBlock
      ? roundToThree(haveCurrency.conversion_rates[receiveCurrencyCode])
      : roundToThree(receiveCurrency.conversion_rates[receiveCurrencyCode]);

    return `1 ${haveCurrencyCode} = ${currencyRate} ${receiveCurrencyCode}`;
  }, [haveCurrency, receiveCurrency, isHaveBlock]);

  const hangleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (inputValue === '' || regex.test(inputValue)) {
      hangleConvert(inputValue, blockName);
    }
  };

  const handleSelectCurrency = async (option: SingleValue<IOption>) => {
    if (!option) {
      return;
    }

    if (isHaveBlock) {
      try {
        const newCurrency = await getCurrencyInfo(option.value);

        dispatch({
          type: 'setHaveCurrency',
          payload: newCurrency,
        });
        hangleConvert('', blockName);
      } catch {
        toast.error(ERROR_MESSAGE);
        hangleConvert('', blockName);
      }
    } else {
      try {
        const newCurrency = await getCurrencyInfo(option.value);

        dispatch({
          type: 'setReceiveCurrency',
          payload: newCurrency,
        });
        hangleConvert('', blockName);
      } catch {
        toast.error(ERROR_MESSAGE);
        hangleConvert('', blockName);
      }
    }
  };

  return (
    <div className={styles.container}>
      <p>You {blockName}</p>

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
          defaultValue={defaultOption}
          styles={customStyles}
          onChange={handleSelectCurrency}
          required
        />
      </div>
      <p>{currencyRateValue}</p>
    </div>
  );
};
