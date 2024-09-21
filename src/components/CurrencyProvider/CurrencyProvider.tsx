import { createContext, useReducer } from 'react';
import { ICurrencyReasponseData } from '../../types';

type Action =
  | { type: 'setMainCurrency'; payload: ICurrencyReasponseData }
  | { type: 'setHaveCurrency'; payload: ICurrencyReasponseData }
  | { type: 'setReceiveCurrency'; payload: ICurrencyReasponseData };

interface IState {
  mainCurrency: ICurrencyReasponseData | null;
  haveCurrency: ICurrencyReasponseData | null;
  receiveCurrency: ICurrencyReasponseData | null;
}

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case 'setMainCurrency':
      return {
        ...state,
        mainCurrency: action.payload,
        haveCurrency: action.payload,
        receiveCurrency: action.payload,
      };

    case 'setHaveCurrency':
      return {
        ...state,
        haveCurrency: action.payload,
      };

    case 'setReceiveCurrency':
      return {
        ...state,
        receiveCurrency: action.payload,
      };

    default:
      return state;
  }
};
const initialState: IState = {
  mainCurrency: null,
  haveCurrency: null,
  receiveCurrency: null,
};

export const StateContext = createContext<IState>(initialState);
export const DispatchContext = createContext<(action: Action) => void>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const CurrencyProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
