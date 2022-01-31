import React, { useContext, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerNavbar from '../../components/drawer-navbar';
import RecentInvestmentList from '../../components/recent-investment-list';
import KycInform from '../../components/kyc-inform';
import { RootContext } from '../../context-api/root-context';
import {
  handleHideIndicator,
  handleHideKycIndicator,
  handleShowKycIndicator,
} from '../../context-api/indicator-context/handlers';
import { handleLoadKyc } from '../../context-api/root-context/handlers';
import { useNavigation } from '@react-navigation/native';
import { IndicatorContext } from '../../context-api/indicator-context';
import DashboardView from '../../components/dashboard-view';
import { fetchKycRequest } from '../../api/auth-services';

export default function Dashboard() {
  const navigation = useNavigation();

  const { state: indicatorState, dispatch: indicatorDispatch } = useContext(IndicatorContext);
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);
  const {
    user_details: { user_id },
    kyc_details,
  } = rootState;
  const { showKyc } = indicatorState;

  console.log('indicatorState', indicatorState);

  const fetchKyc = () => {
    fetchKycRequest({ user_id }).then(res => {
      const { status, message, data } = res;
      if (!data) {
        //Boolean(Object.keys(data).length) == false
        rootDispatch(handleLoadKyc({ message: message }));
        indicatorDispatch(handleShowKycIndicator({ message }));
      } else {
        rootDispatch(handleLoadKyc({ message: message }));
        indicatorDispatch(handleHideKycIndicator({ message }));
      }
    });
  };

  useEffect(() => {
    fetchKyc();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerNavbar title={'Dashboard'} />
      <DashboardView />
      <RecentInvestmentList />
      <KycInform />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { padding: RFValue(20) },
  iconAddWrapper: {
    height: RFValue(50, 668),
    width: RFValue(50, 668),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555555',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  iconAdd: { color: '#999999', fontSize: RFValue(20) },
});

// npm install --save react-native-modal react-native-fs numbro react-native-animatable && react-native link react-native-fs && npm start
