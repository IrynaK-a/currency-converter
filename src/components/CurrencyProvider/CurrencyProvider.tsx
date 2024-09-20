import { createContext, useReducer } from 'react';

type Action = { type: 'selectAnswer'; payload: number };

interface IState {
  haveCurrency: string;
  receiveCurrency: string;
}

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case 'selectAnswer':
      return initialState;

    default:
      return state;
  }
};
const initialState: IState = {
  haveCurrency: 'USD',
  receiveCurrency: 'USD',
};

export const StateContex = createContext<IState>(initialState);
export const DispatchContex = createContext<(action: Action) => void>(() => {});

type Props = {
  children: React.ReactNode;
};

export const CurrencyProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContex.Provider value={dispatch}>
      <StateContex.Provider value={state}>{children}</StateContex.Provider>
    </DispatchContex.Provider>
  );
};
