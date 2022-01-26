import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import { _currency } from '../utils/textFormat';
import moment from 'moment';

export default function AllInvestmentItem({
  generated_invest_id,
  invest_amount,
  invest_date,
  investment_id,
  user_id,
  ...props
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.row}>
        {/*<Text style={styles.key}>*/}
        {/*  Units:{'\t'}*/}
        {/*  <Text style={styles.value}>{invest_date}</Text>*/}
        {/*</Text>*/}
        <Text style={styles.key}>{invest_date}</Text>
      </View>
      <Text style={styles.key}>
        Amount Invested:{'\t'}
        <Text style={styles.value}>{_currency(invest_amount)}</Text>
      </Text>
      {/*<Text style={styles.key}>*/}
      {/*  Current Value:{'\t'}*/}
      {/*  <Text style={styles.value}>{_currency(98765)}</Text>*/}
      {/*</Text>*/}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: RFValue(50),
    padding: RFValue(20),
    paddingVertical: RFValue(5),
    marginBottom: RFValue(20),
    marginHorizontal: RFValue(20),
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#FBE4E4',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  key: {
    color: '#555555',
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10),
  },
  value: {
    color: '#000000',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(10),
  },
  viewCertWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#28D094',
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(5),
  },
  viewCert: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(10),
  },
});
