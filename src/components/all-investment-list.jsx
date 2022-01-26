import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import RecentInvestmentItem from './recent-investment-item';
import SearchInput from './search-input';
import DashboardView from './dashboard-view';
import AllInvestmentItem from './all-investment-item';
import { InvestmentContext } from '../context-api/investment-context';
import { fetchInvestmentsListRequest } from '../api/investment-services';
import { handleLoadAllInvestments } from '../context-api/investment-context/handlers';
import { RootContext } from '../context-api/root-context';

export default function AllInvestmentList(props) {
  const navigation = useNavigation();
  const { state: investmentState, dispatch: investmentDispatch } = useContext(InvestmentContext);
  const { data, status } = investmentState;
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // console.log('investmentState', investmentState);
  const {
    user_details: { user_id },
  } = rootState;

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => setShowSearch(prev => !prev);
  const onEnterQuery = query => setSearchQuery(query);

  const listHeader = (
    <View style={[styles.listHeaderContainer, { paddingBottom: RFValue(20) }]}>
      <SearchInput
        onChangeText={onEnterQuery}
        onClose={toggleSearch}
        visible={true}
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
          Sorry, unable to fetch investment history at the moment!
        </Text>
      ) : (
        <Text style={styles.listEmptyText}>You have no investment history at the moment!</Text>
      )}
    </View>
  );

  const fetchData = () =>
    fetchInvestmentsListRequest({ user_id }).then(r => {
      const { status, message, data } = r;
      if (status) {
        investmentDispatch(handleLoadAllInvestments({ data, status: 'success' }));
      } else {
        investmentDispatch(handleLoadAllInvestments({ status: 'error' }));
      }
    });

  const reloadData = () => {
    setIsRefreshing(true);
    fetchData().then(() => setIsRefreshing(false));
  };

  // useEffect(() => {
  //   investmentDispatch(handleLoadAllInvestments({ status: 'loading' }));
  //   fetchData();
  // }, []);

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
          keyExtractor={(item, index) => item.investment_id ?? index.toString()}
          renderItem={({ item, index }) => <AllInvestmentItem {...item} />}
          contentInsetAdjustmentBehavior={'automatic'}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={reloadData} />}
          ListEmptyComponent={listEmpty}
          // ListHeaderComponent={listHeader}
          // initialNumToRender={10}
        />
      )}
      {status !== ('error' || 'loading') && (
        <TouchableOpacity
          style={styles.iconAddWrapper}
          onPress={() => navigation.navigate('New Investment')}
        >
          <MaterialCommunityIcons name={'briefcase-plus-outline'} style={styles.iconAdd} />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingBottom: RFValue(200),
  },
  contentContainer: {
    paddingTop: RFValue(20),
    paddingBottom: RFValue(60),
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
    backgroundColor: '#C00000',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  iconAdd: { color: '#FFFFFF', fontSize: RFValue(25) },
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
