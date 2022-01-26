import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

export default function ButtonText(props) {
  return (
    <TouchableOpacity style={[styles.container, props.containerStyles]} onPress={props.onPress}>
      {props.title && <Text style={styles.title}>{props.title}</Text>}
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: RFValue(40, 668),
    // alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    // borderWidth: 2,
  },
  title: {
    color: '#C00000',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(12),
  },
});
