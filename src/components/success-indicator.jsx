import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, Button } from 'react-native';

import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { IndicatorContext } from '../context-api/indicator-context';
import { handleHideIndicator } from '../context-api/indicator-context/handlers';
import { indicatorActionTypes } from '../context-api/indicator-context/action-types';

const { width } = Dimensions.get('screen');

export default function SuccessIndicator(props) {
  const counter = useRef(new Animated.Value(0)).current;
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);
  const { state: indicatorState, dispatch: indicatorDispatch } = useContext(IndicatorContext);

  // console.log('indicatorState', indicatorState);

  useEffect(() => {
    countInterval.current = setInterval(() => setCount(old => old + 5), 1000);
    return () => {
      clearInterval(countInterval);
    };
  }, []);

  useEffect(() => {
    load(count);
    if (count >= 100) {
      setCount(100);
      clearInterval(countInterval);
    }
    return () => {
      clearInterval(countInterval);
    };
  }, [count]);

  const load = count => {
    Animated.timing(counter, {
      toValue: count,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const widthAnimated = counter.interpolate({
    inputRange: [0, 100],
    outputRange: [-width, 0],
    extrapolate: 'clamp',
  });

  const onClose = () => {
    if (indicatorState.status !== indicatorActionTypes.Loading) {
      indicatorDispatch(handleHideIndicator());
      setCount(0);
    }
  };

  return (
    <Modal
      {...indicatorState}
      isVisible={Boolean(
        indicatorState.isVisible && indicatorState.status === indicatorActionTypes.Success,
      )}
      style={styles.container}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <View style={styles.progressWrapper}>
        <Animated.View
          style={
            ([StyleSheet.absoluteFill],
            {
              backgroundColor: 'green',
              width: width,
              transform: [{ translateX: widthAnimated }],
            })
          }
        />
      </View>
      <View style={styles.content}>
        {indicatorState.status === indicatorActionTypes.Success && (
          <View style={styles.wrapper}>
            {<Text style={[styles.title, { color: 'green' }]}>{indicatorState.title}</Text>}
            {indicatorState.message && (
              <Text style={styles.message} numberOfLines={4}>
                {indicatorState.message}
              </Text>
            )}
          </View>
        )}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    width: '80%',
    minHeight: width * 0.1,
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(5),
  },
  title: { color: '#333333', fontFamily: 'Poppins-Bold', fontSize: RFValue(14) },
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
