import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { _currency } from '../utils/textFormat';
import moment from 'moment';
import DashboardViewItem from './dashboard-view-item';
import {
  fetchInvestmentFundRequest,
  fetchInvestmentsListRequest,
} from '../api/investment-services';
import {
  handleLoadAllInvestments,
  handleLoadInvestmentsDatas,
} from '../context-api/investment-context/handlers';
import { InvestmentContext } from '../context-api/investment-context';
import { RootContext } from '../context-api/root-context';

export default function DashboardView(props) {
  const navigation = useNavigation();
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);
  const { state: investmentState, dispatch: investmentDispatch } = useContext(InvestmentContext);
  const { data, others } = investmentState;
  // console.log('rootState', rootState);
  const {
    user_details: { user_id, account_name, account_no },
  } = rootState;

  function fetchData() {
    fetchInvestmentFundRequest({ user_id }).then(r => {
      const { status, message, data } = r;
      if (status) {
        investmentDispatch(handleLoadInvestmentsDatas(data));
        // console.log('inv fund', data);
      } else {
        // console.log('inv fund', message);
        investmentDispatch(handleLoadInvestmentsDatas({ status: 'error' }));
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  //credit-card
  return (
    <View style={[styles.container]}>
      <DashboardViewItem
        icon={<SimpleLineIcons name={'briefcase'} style={styles.icon} />}
        title={'TOTAL INVESTMENT'}
        amount={others?.total_amount_invested ?? 0}
      />
      <DashboardViewItem
        icon={<SimpleLineIcons name={'wallet'} style={styles.icon} />}
        title={'AVAILABLE BALANCE'}
        amount={others?.available_balance ?? 0}
      />
      <DashboardViewItem
        icon={<SimpleLineIcons name={'basket-loaded'} style={styles.icon} />}
        title={'TOTAL INVESTED'}
        amount={others?.total_amount_invested ?? 0}
      />
      <DashboardViewItem
        icon={<SimpleLineIcons name={'credit-card'} style={styles.icon} />}
        title={account_name}
        subtitle={'account_no'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  icon: { color: '#999999', fontSize: RFValue(15) },
});

const _ = {
  available_balance: '1600',
  current_value: '0',
  total_amount_invested: '2400',
  total_investment_amount: '4000',
  user_id: '2',
};
