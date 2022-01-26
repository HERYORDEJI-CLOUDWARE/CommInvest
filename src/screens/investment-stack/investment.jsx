import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AllInvestmentList from '../../components/all-investment-list';
import DrawerNavbar from '../../components/drawer-navbar';
import { InvestmentContext } from '../../context-api/investment-context';

export default function Investment() {
  const { state: investmentState, dispatch: investmentDispatch } = useContext(InvestmentContext);

  // console.log('investmentState', investmentState);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerNavbar title={'Investment'} />
      <AllInvestmentList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { padding: RFValue(20) },
});
