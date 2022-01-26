import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FilePickerManager from 'react-native-file-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import ButtonPrimary from '../../components/button-primay';
import StackNavbar from '../../components/stack-navbar';
import InputText from '../../components/input-text';
import { _currency, _digitFormat, _unformatNumbro } from '../../utils/textFormat';
import { InvestmentContext } from '../../context-api/investment-context';
import { IndicatorContext } from '../../context-api/indicator-context';
import {
  handleErrorIndicator,
  handleLoadingIndicator,
  handleSuccessIndicator,
} from '../../context-api/indicator-context/handlers';
import {
  fetchInvestmentsListRequest,
  makeInvestmentFundRequest,
} from '../../api/investment-services';
import { RootContext } from '../../context-api/root-context';
import { useNavigation } from '@react-navigation/native';
import { handleLoadAllInvestments } from '../../context-api/investment-context/handlers';

export default function NewInvestment() {
  const navigation = useNavigation();
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);
  const { dispatch: indicatorDispatch } = useContext(IndicatorContext);
  const { dispatch: investmentDispatch } = useContext(InvestmentContext);
  const {
    user_details: { user_id },
  } = rootState;
  const [amount, setAmount] = useState(null);

  const onEnterAmount = amount => {
    if (typeof _unformatNumbro(amount) === 'number') {
      setAmount(_digitFormat(amount));
    } else {
      setAmount('');
    }
  };

  const fetchAllInvestment = () =>
    fetchInvestmentsListRequest({ user_id })
      .then(r => {
        const { status, message, data } = r;
        if (status) {
          investmentDispatch(handleLoadAllInvestments({ ...data }));
        } else {
          investmentDispatch(handleLoadAllInvestments({ status: 'error' }));
        }
      })
      .finally(() => navigation.goBack());

  const onSubmit = () => {
    indicatorDispatch(handleLoadingIndicator());
    makeInvestmentFundRequest({ user_id, amount: _unformatNumbro(amount) })
      .then(res => {
        const { status, message } = res;
        if (Boolean(status)) {
          indicatorDispatch(handleSuccessIndicator({ message }));
          setAmount(null);
          fetchAllInvestment();

          // investmentDispatch(han)
        } else {
          indicatorDispatch(handleErrorIndicator({ message }));
        }
      })
      .catch(err => {});
  };

  return (
    <SafeAreaView>
      <StackNavbar title={'New Investment'} />
      <ScrollView style={styles.content} contentInsetAdjustmentBehavior="automatic">
        <InputText
          label={'Amount to invest?'}
          value={amount}
          onChangeText={onEnterAmount}
          keyboardType={'number-pad'}
          type={'money'}
        />
      </ScrollView>
      <ButtonPrimary
        onPress={onSubmit}
        title={'Invest now'}
        containerStyles={{ margin: RFValue(20) }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { padding: RFValue(20) },
});
