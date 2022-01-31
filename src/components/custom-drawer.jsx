import React, { useContext, useRef } from 'react';
import { Animated, View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { RFValue } from 'react-native-responsive-fontsize';
import { IndicatorContext } from '../context-api/indicator-context';
import { RootContext } from '../context-api/root-context';
import {
  handleHideIndicator,
  handleHideKycIndicator,
} from '../context-api/indicator-context/handlers';
import { handleClearRoot } from '../context-api/root-context/handlers';
import { useNavigation } from '@react-navigation/native';

export default function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const { state: indicatorState, dispatch: indicatorDispatch } = useContext(IndicatorContext);
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);

  const onLogout = async () => {
    // await indicatorDispatch(handleHideKycIndicator());
    await indicatorDispatch(handleHideIndicator());
    await rootDispatch(handleClearRoot());
    await navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };

  return (
    <>
      <DrawerContentScrollView {...props} style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/images/logos/bootsplash_logo.png')}
            style={styles.logo}
          />
        </View>
        <DrawerItemList {...props} />
        {/*<DrawerItem label="Help" onPress={() => Linking.openURL('https://mywebsite.com/help')} />*/}
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.logoutWrapper} onPress={onLogout}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#000000', paddingVertical: RFValue(20) },
  logoWrapper: { alignItems: 'center', paddingVertical: RFValue(20) },
  logo: {},
  logoutWrapper: { padding: RFValue(20), backgroundColor: '#33333350' },
  logout: { color: '#FFFFFF', fontFamily: 'Poppins-Medium', fontSize: RFValue(12) },
});
