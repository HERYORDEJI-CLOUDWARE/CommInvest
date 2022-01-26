import React, { createContext, useReducer } from 'react';
import { indicatorInitialState, indicatorReducer } from './reducer';

export const IndicatorContext = createContext();

export default function IndicatorContextProvider(props) {
  const [state, dispatch] = useReducer(indicatorReducer, indicatorInitialState);

  return (
    <IndicatorContext.Provider value={{ state, dispatch }}>
      {props.children}
    </IndicatorContext.Provider>
  );
}
