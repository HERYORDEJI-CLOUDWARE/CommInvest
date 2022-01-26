import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { InvestmentContext } from '../context-api/investment-context';
import { RootContext } from '../context-api/root-context';
import { _currency } from '../utils/textFormat';

export default function DashboardViewItem({ title, subtitle, amount, ...props }) {
  const navigation = useNavigation();
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);
  const { state: investmentState, dispatch: investmentDispatch } = useContext(InvestmentContext);
  const { data, others } = investmentState;
  // console.log('rootState', rootState);

  return (
    <View style={[styles.container]}>
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.message}>{amount ? _currency(amount) : subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: RFValue(40),
    // padding: RFValue(10),
    // paddingVertical: RFValue(0),
    marginBottom: RFValue(20),
    backgroundColor: '#FBE4E4',
    margin: RFValue(10),
    padding: RFValue(5),
    flex: 1,
    // flexShrink: 0,
    // width: '100%',
    flexBasis: '30%',
  },
  content: {
    // height: RFValue(40),
    // padding: RFValue(10),
    // paddingVertical: RFValue(0),
    marginBottom: RFValue(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
  },
  textInput: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(12),
    marginRight: RFValue(10),
    flex: 1,
    // width: '100%',
    height: '100%',
    textAlignVertical: 'center',
  },
  name: {
    color: '#C00000',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(12),
    marginBottom: RFValue(10),
  },
  message: {
    color: '#C00000',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(12),
  },
  icon: { color: '#999999', fontSize: RFValue(15) },
});

const _ = {
  available_balance: '1600',
  current_value: '0',
  total_amount_invested: '2400',
  total_investment_amount: '4000',
  user_id: '2',
};
