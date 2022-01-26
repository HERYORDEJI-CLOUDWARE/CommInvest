import React, { createContext, useReducer } from 'react';
import { rootInitialState, rootReducer } from './reducer';

export const RootContext = createContext();

export default function RootContextProvider(props) {
  const [state, dispatch] = useReducer(rootReducer, rootInitialState);

  return <RootContext.Provider value={{ state, dispatch }}>{props.children}</RootContext.Provider>;
}
