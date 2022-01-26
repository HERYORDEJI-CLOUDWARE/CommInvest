import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { IndicatorContext } from '../context-api/indicator-context';
import { handleHideIndicator } from '../context-api/indicator-context/handlers';
import { indicatorActionTypes } from '../context-api/indicator-context/action-types';

const { width } = Dimensions.get('screen');

export default function MenuModal(props) {
  return (
    <Modal
      isVisible={props.isVisible}
      style={styles.container}
      onBackButtonPress={props.onClose}
      onBackdropPress={props.onClose}
    >
      <View style={styles.content}>
        <ScrollView
          horizontal={false}
          style={styles.wrapper}
          contentContainerStyle={styles.contentContainer}
        >
          {props.data?.map((item, index) => (
            <TouchableOpacity
              onPress={() => props.onSelect({ value: item })}
              key={item}
              style={[
                styles.btnWrapper,
                { borderBottomWidth: index + 1 === props.data?.length ? 0 : 2 },
              ]}
            >
              <Text style={styles.title}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

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
  },
  wrapper: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    width: '80%',
    minHeight: width * 0.1,
    borderRadius: RFValue(10),
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
});
