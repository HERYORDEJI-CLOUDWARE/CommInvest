import React, { createContext, useReducer } from 'react';
import { authInitialState, authReducer } from './reducer';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>;
}
