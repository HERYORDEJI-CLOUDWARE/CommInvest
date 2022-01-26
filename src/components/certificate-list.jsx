import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import SearchInput from './search-input';
import CertificateItem from './certificate-item';
import { InvestmentContext } from '../context-api/investment-context';

export default function CertificateList(props) {
  const navigation = useNavigation();
  const { state: investmentState, dispatch: investmentDispatch } = useContext(InvestmentContext);
  const { data } = investmentState;

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

  // console.log('certificate', data);

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data}
        keyExtractor={(item, index) => item.investment_id ?? index.toString()}
        renderItem={({ item, index }) => <CertificateItem {...item} />}
        contentInsetAdjustmentBehavior={'automatic'}
        // ListHeaderComponent={listHeader}
      />
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
});
