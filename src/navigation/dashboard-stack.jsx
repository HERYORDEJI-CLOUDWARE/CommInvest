import React from 'react';
import { useWindowDimensions } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import NewInvestment from '../screens/investment-stack/new-investment';
import Dashboard from '../screens/dashboard-stack/dashboard';

const { Navigator, Screen } = createStackNavigator();

export default function DashboardStack(params) {
  return (
    <Navigator
      initialRouteName={'Dashboard_'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={'Dashboard_'} component={Dashboard} />
      <Screen name={'New Investment'} component={NewInvestment} />
    </Navigator>
  );
}
