import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import PaymentHistory from '../screens/payment-history-stack/payment-history';
import PaymentContextProvider from '../context-api/payment-context';

const { Navigator, Screen } = createStackNavigator();

export default function PaymentStack(params) {
  return (
    <PaymentContextProvider>
      <Navigator
        initialRouteName={'Payment History'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name={'Payment History'} component={PaymentHistory} />
      </Navigator>
    </PaymentContextProvider>
  );
}
