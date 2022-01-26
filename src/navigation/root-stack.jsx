import React, { useContext, useEffect } from 'react';

import DrawerStack from './drawer-stack';
import AuthStack from './auth-stack';
import AuthContextProvider from '../context-api/auth-context';
import IndicatorContextProvider from '../context-api/indicator-context';
import { RootContext } from '../context-api/root-context';
import InvestmentContextProvider from '../context-api/investment-context';

export default function RootStack(params) {
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);
  const { user_details } = rootState;

  // console.log('Boolean(rootState.user_details)', Boolean(rootState.user_details));
  console.log('rootState', rootState);

  return (
    <IndicatorContextProvider>
      {Boolean(user_details?.user_status) ? (
        <InvestmentContextProvider>
          <DrawerStack />
        </InvestmentContextProvider>
      ) : (
        <AuthContextProvider>
          <AuthStack />
        </AuthContextProvider>
      )}
    </IndicatorContextProvider>
  );
}

/*
 <IndicatorContextProvider>
      {!Boolean(rootState.user_details) ? (
        <InvestmentContextProvider>
          <DrawerStack />
        </InvestmentContextProvider>
      ) : (
        <AuthContextProvider>
          <AuthStack />
        </AuthContextProvider>
      )}
    </IndicatorContextProvider>
 */
