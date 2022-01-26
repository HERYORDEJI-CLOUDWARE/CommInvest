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
  handleHideKycIndicator,
  handleShowKycIndicator,
} from '../../context-api/indicator-context/handlers';
import { useNavigation } from '@react-navigation/native';
import { IndicatorContext } from '../../context-api/indicator-context';
import DashboardView from '../../components/dashboard-view';

export default function Dashboard() {
  const navigation = useNavigation();

  const { state: indicatorState, dispatch: indicatorDispatch } = useContext(IndicatorContext);
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);
  const {
    user_details: { kyc_status },
  } = rootState;
  const { showKyc } = indicatorState;

  useEffect(() => {
    setTimeout(() => {
      if (!kyc_status) {
        indicatorDispatch(handleShowKycIndicator());
      }
    }, 1234);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerNavbar title={'Dashboard'} />
      <DashboardView />
      <RecentInvestmentList />
      <KycInform
        isVisible={!kyc_status && showKyc}
        onAccept={() => {
          navigation.navigate('KYC Form');
          indicatorDispatch(handleHideKycIndicator());
        }}
      />
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
