import { DispatchContext, StateContext } from '../components';
import { useContext } from 'react';

export const useDispatch = () => useContext(DispatchContext);
export const useCurrencyState = () => useContext(StateContext);
