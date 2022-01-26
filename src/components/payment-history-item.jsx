import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import { _currency } from '../utils/textFormat';
import moment from 'moment';

export default function PaymentHistoryItem({
  amount,
  email,
  flwref,
  payment_id,
  trans_date,
  txRef,
  ...props
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.row}>
        {/*<Text style={styles.key}>*/}
        {/*  Name:{'\t'}*/}
        {/*  <Text style={styles.value}>OYEBODE Y. A.</Text>*/}
        {/*</Text>*/}
        <Text style={styles.key}>{trans_date}</Text>
      </View>
      <Text style={styles.key}>
        Amount Payed:{'\t'}
        <Text style={styles.value}>{_currency(amount)}</Text>
      </Text>
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
});

const _ = {
  amount: '100',
  email: 'tesft@email.com',
  flwref: 'FLWPUBK-24b72aebb821aea177483039677df9d3-u',
  payment_id: '3',
  trans_date: '10-01-2022 01:05:35',
  txRef: 'vta79138929',
};
