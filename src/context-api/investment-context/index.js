import React, { createContext, useReducer } from 'react';
import { investmentInitialState, investmentReducer } from './reducer';

export const InvestmentContext = createContext();

export default function InvestmentContextProvider(props) {
  const [state, dispatch] = useReducer(investmentReducer, investmentInitialState);

  return (
    <InvestmentContext.Provider value={{ state, dispatch }}>
      {props.children}
    </InvestmentContext.Provider>
  );
}
