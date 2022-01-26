import React, { createContext, useReducer } from 'react';
import { paymentInitialState, paymentReducer } from './reducer';

export const PaymentContext = createContext();

export default function PaymentContextProvider(props) {
  const [state, dispatch] = useReducer(paymentReducer, paymentInitialState);

  return (
    <PaymentContext.Provider value={{ state, dispatch }}>{props.children}</PaymentContext.Provider>
  );
}
