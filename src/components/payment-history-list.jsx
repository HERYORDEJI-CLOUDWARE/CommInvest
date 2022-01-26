import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import PaymentHistoryItem from './payment-history-item';
import SearchInput from './search-input';
import DashboardView from './dashboard-view';
import { InvestmentContext } from '../context-api/investment-context';
import { RootContext } from '../context-api/root-context';
import { fetchInvestmentsListRequest } from '../api/investment-services';
import { handleLoadAllInvestments } from '../context-api/investment-context/handlers';
import { PaymentContext } from '../context-api/payment-context';
import { fetchPaymentsListRequest } from '../api/payment-services';
import { handleLoadAllPayments } from '../context-api/payment-context/handlers';

export default function PaymentHistoryList(props) {
  const navigation = useNavigation();

  const { state: paymentState, dispatch: paymentDispatch } = useContext(PaymentContext);
  const { data, status } = paymentState;
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);

  const {
    user_details: { user_id, user_email },
  } = rootState;

  const [showSearch, setShowSearch] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onEnterQuery = query => setSearchQuery(query);
  // console.log('paymentState', paymentState);

  const fetchData = () =>
    fetchPaymentsListRequest({ user_email }).then(r => {
      const { status, message, data } = r;
      if (Boolean(status)) {
        paymentDispatch(handleLoadAllPayments({ data, status: 'success' }));
      } else {
        paymentDispatch(handleLoadAllPayments({ status: 'error' }));
        // console.log('payment res', r);
      }
    });

  const reloadData = () => {
    setIsRefreshing(true);
    fetchData().then(() => setIsRefreshing(false));
  };

  useEffect(() => {
    paymentDispatch(handleLoadAllInvestments({ status: 'loading' }));
    fetchData();
  }, []);

  const listHeader = (
    <View style={[styles.listHeaderContainer, { paddingBottom: RFValue(20) }]}>
      <SearchInput
        onChangeText={onEnterQuery}
        // onClose={}
        visible={showSearch}
        containerStyles={{ marginHorizontal: RFValue(20) }}
      />
    </View>
  );

  const moreMenu = () => {
    return (
      <View style={styles.moreMenuWrapper}>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => {}}>
          <FontAwesome name={'ellipsis-v'} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  const listEmpty = (
    <View style={styles.listEmptyWrapper}>
      {status !== 'loading' && status === 'error' ? (
        <Text style={styles.listEmptyText}>
          Sorry, unable to fetch payments history at the moment!
        </Text>
      ) : (
        <Text style={styles.listEmptyText}>You have no payment history at the moment!</Text>
      )}
    </View>
  );

  const listError = <View style={styles.listEmptyWrapper}></View>;

  if (status === 'loading') {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size={'large'} color={'#C00000'} />
      </View>
    );
  }

  return (
    <>
      {status !== 'loading' && (
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={data}
          // data={[...Array(30).keys()]}
          renderItem={({ item, index }) => <PaymentHistoryItem {...item} />}
          keyExtractor={(item, index) => item.txRef + item.flwref + item.payment_id}
          contentInsetAdjustmentBehavior={'automatic'}
          // ListHeaderComponent={listHeader}
          ListEmptyComponent={listEmpty}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={reloadData} />}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingBottom: RFValue(200),
  },
  contentContainer: {
    paddingBottom: RFValue(60),
    paddingTop: RFValue(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listHeaderContainer: {
    paddingBottom: RFValue(10),
    backgroundColor: '#FFFFFF',
    // height: RFValue(200),
  },
  listHeaderTitle: {
    color: '#999999',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(16),
    paddingHorizontal: RFValue(20),
  },
  iconWrapper: {
    paddingHorizontal: RFValue(20),
  },
  icon: { color: '#999999', fontSize: RFValue(20) },
  iconAddWrapper: {
    height: RFValue(50, 668),
    width: RFValue(50, 668),
    borderRadius: RFValue(50),
    margin: RFValue(20),
    elevation: RFValue(3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555555',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  iconAdd: { color: '#999999', fontSize: RFValue(25) },
  loadingWrapper: {
    padding: RFValue(20),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyWrapper: {
    padding: RFValue(20),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyText: {
    color: '#C00000',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(16),
    paddingHorizontal: RFValue(20),
  },
});
