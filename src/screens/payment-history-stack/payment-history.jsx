import React from 'react';
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
import DrawerNavbar from '../../components/drawer-navbar';
import PaymentHistoryList from '../../components/payment-history-list';

export default function PaymentHistory() {
  return (
    <SafeAreaView style={styles.container}>
      <DrawerNavbar title={'Payment History'} />
      <PaymentHistoryList />
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
