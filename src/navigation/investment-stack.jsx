import React from 'react';
import { useWindowDimensions } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Investment from '../screens/investment-stack/investment';
import NewInvestment from '../screens/investment-stack/new-investment';
import InvestmentContextProvider from '../context-api/investment-context';

const { Navigator, Screen } = createStackNavigator();

export default function InvestmentStack(params) {
  const dimensions = useWindowDimensions();

  return (
    <Navigator
      initialRouteName={'Investment_'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={'Investment_'} component={Investment} />
      <Screen name={'New Investment'} component={NewInvestment} />
    </Navigator>
  );
}
