import React, { useContext } from 'react';
import { useWindowDimensions } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth-stack/login';
import Register from '../screens/auth-stack/register';
import { IndicatorContext } from '../context-api/indicator-context';
import ForgetPassword from '../screens/auth-stack/forget-password';
import ActivationLink from '../screens/auth-stack/activation-link';

const { Navigator, Screen } = createStackNavigator();

export default function AuthStack(params) {
  // console.log('Indic state', indicatorState);

  return (
    <Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={'Login'} component={Login} />
      <Screen name={'Register'} component={Register} />
      <Screen name={'Forget Password'} component={ForgetPassword} />
      <Screen name={'Activation Link'} component={ActivationLink} />
    </Navigator>
  );
}
