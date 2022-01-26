import React from 'react';
import { useWindowDimensions } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/profile-stack/profile';
import EditProfile from '../screens/profile-stack/edit-profile';
import { RFValue } from 'react-native-responsive-fontsize';
import KycForm from '../screens/profile-stack/kyc-form';
import ChangePassword from '../screens/profile-stack/change-password';

const { Navigator, Screen } = createStackNavigator();

export default function ProfileStack(params) {
  const dimensions = useWindowDimensions();

  return (
    <Navigator
      initialRouteName={'Profile_'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={'Profile_'} component={Profile} />
      <Screen name={'Edit Profile'} component={EditProfile} />
      <Screen name={'KYC Form'} component={KycForm} />
      <Screen name={'Change Password'} component={ChangePassword} />
    </Navigator>
  );
}
