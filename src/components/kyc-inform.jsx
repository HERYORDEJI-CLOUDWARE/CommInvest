import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, Button, ScrollView } from 'react-native';

import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { IndicatorContext } from '../context-api/indicator-context';
import { useNavigation } from '@react-navigation/native';
import {
  handleHideIndicator,
  handleHideKycIndicator,
} from '../context-api/indicator-context/handlers';
import { indicatorActionTypes } from '../context-api/indicator-context/action-types';
import ButtonPrimary from './button-primay';

const { width } = Dimensions.get('screen');

export default function KycInform(props) {
  const { state: indicatorState, dispatch: indicatorDispatch } = useContext(IndicatorContext);
  const { showKyc, kycMessage } = indicatorState;
  const navigation = useNavigation();

  return (
    <Modal
      isVisible={Boolean(showKyc)}
      style={styles.container}
      onBackButtonPress={() => indicatorDispatch(handleHideKycIndicator())}
      onBackdropPress={() => indicatorDispatch(handleHideKycIndicator())}
    >
      <View style={styles.content}>
        <ScrollView
          horizontal={false}
          style={styles.wrapper}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={[styles.title, { color: '#C00000' }]}>Announcement!!!</Text>
          <Text style={styles.message} numberOfLines={4}>
            {kycMessage}
          </Text>
        </ScrollView>
        <View style={styles.bottomWrapper}>
          <ButtonPrimary
            title={'Cancel'}
            onPress={() => indicatorDispatch(handleHideKycIndicator())}
            containerStyles={{ backgroundColor: 'transparent', marginHorizontal: RFValue(20) }}
            titleStyles={{ color: '#111222' }}
          />
          <ButtonPrimary
            title={'Accept'}
            onPress={() => {
              navigation.navigate('KYC');
              indicatorDispatch(handleHideKycIndicator());
            }}
            containerStyles={{ backgroundColor: 'transparent', marginHorizontal: RFValue(20) }}
            titleStyles={{ color: '#C00000' }}
          />
        </View>
      </View>
    </Modal>
  );
}

/*
 <KycInform
        isVisible={Boolean(!kyc_details?.kyc_status && showKyc)}
        onAccept={() => {
          navigation.navigate('KYC Form');
          indicatorDispatch(handleHideKycIndicator());
        }}
      />
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: 0,
    margin: 0,
    padding: 0,
  },
  content: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
  },
  wrapper: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    width: '80%',
    minHeight: width * 0.1,
    borderRadius: RFValue(10),
    padding: RFValue(10),
    // paddingHorizontal: RFValue(10),
  },
  btnWrapper: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(10),
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 2,
  },
  title: {
    color: '#333333',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(14),
    textAlign: 'center',
  },
  message: { color: '#555555', fontFamily: 'Poppins-Medium', fontSize: RFValue(12) },
  progressWrapper: {
    position: 'absolute',
    top: 0,
    height: RFValue(5),
    flexDirection: 'row',
    width: '100%',
  },
  progressBar: {
    width,
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
