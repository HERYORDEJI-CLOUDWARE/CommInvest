import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import { _currency } from '../utils/textFormat';
import moment from 'moment';

export default function SearchInput(props) {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        { display: props.visible ? 'flex' : 'none' },
        props.containerStyles,
      ]}
    >
      {/* <View style={styles.textInputWrapper}> */}
      <TextInput
        placeholder={'Search here'}
        placeholderTextColor={'#997878'}
        {...props}
        style={styles.textInput}
      />
      {/* </View> */}
      <TouchableOpacity style={styles.iconWrapper} onPress={props.onClose}>
        <FontAwesome name={'close'} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: RFValue(40, 668),
    padding: RFValue(20),
    paddingVertical: RFValue(0),
    marginTop: RFValue(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //
    borderRadius: RFValue(5),
    backgroundColor: '#FFFFFF',
    borderColor: '#C00000',
    borderWidth: 2,
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
  iconWrapper: {
    paddingLeft: RFValue(20),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { color: '#997878', fontSize: RFValue(20) },
});
