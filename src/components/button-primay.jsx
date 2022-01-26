import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

export default function ButtonPrimary(props) {
  return (
    <TouchableOpacity style={[styles.container, props.containerStyles]} onPress={props.onPress}>
      <Text style={[styles.title, props.titleStyles]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: RFValue(50, 668),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(5),
    backgroundColor: '#C00000',
    // borderColor: '#C00000',
    // borderWidth: 2,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(12),
  },
});
