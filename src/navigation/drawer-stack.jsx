import React, { useContext } from 'react';
import { useWindowDimensions } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/dashboard-stack/dashboard';
import InvestmentStack from './investment-stack';
import Support from '../screens/support-stack/support';
import AccountMonitor from '../screens/account-monitor-stack/account-monitor';
import Certificate from '../screens/certificate-stack/certificate';
import ProfileStack from './profile-stack';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomDrawerContent from '../components/custom-drawer';
import { IndicatorContext } from '../context-api/indicator-context';
import LoadingIndicator from '../components/loading-indicator';
import ErrorIndicator from '../components/error-indicator';
import SuccessIndicator from '../components/success-indicator';
import DashboardStack from './dashboard-stack';
import PaymentStack from './payment-stack';

const { Navigator, Screen } = createDrawerNavigator();

export default function DrawerStack(params) {
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;
  const { state: indicatorState, dispatch } = useContext(IndicatorContext);
  // console.log('Indic state', indicatorState);

  return (
    <>
      <LoadingIndicator {...indicatorState} />
      <ErrorIndicator {...indicatorState} />
      <SuccessIndicator {...indicatorState} />
      <Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#000000',
            width: '60%',
          },
          drawerLabelStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: RFValue(12),
          },
          drawerActiveTintColor: '#FFFFFF',
          drawerInactiveTintColor: '#666666',
        }}
        initialRouteName={'Dashboard'}
      >
        <Screen name={'Dashboard'} component={DashboardStack} />
        <Screen name={'Investments'} component={InvestmentStack} />
        <Screen name={'Payments'} component={PaymentStack} />
        <Screen name={'Support'} component={Support} />
        <Screen name={'Account Monitor'} component={AccountMonitor} />
        <Screen name={'Certificate'} component={Certificate} />
        <Screen name={'Profile'} component={ProfileStack} />
      </Navigator>
    </>
  );
}
