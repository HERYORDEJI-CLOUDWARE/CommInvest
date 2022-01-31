import React, { useState, forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const InputText = forwardRef((props, ref) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => setSecureTextEntry(prev => !prev);

  return (
    <View style={[styles.container, props.containerStyles]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      {props.error && <Text style={styles.error}>{props.error}</Text>}
      <View style={[styles.textInputWrapper, props.contentStyles]}>
        {props.type === 'money' && <Text style={styles.naira}>₦</Text>}
        {props.type === 'bvn' && <Text style={styles.naira}>BVN</Text>}
        {props.type === 'email' && (
          <FontAwesome
            name={'envelope-o'}
            style={[styles.icon, { paddingHorizontal: RFValue(10) }]}
          />
        )}
        {props.type === 'password' && (
          <FontAwesome name={'lock'} style={[styles.icon, { paddingHorizontal: RFValue(10) }]} />
        )}
        {props.type === 'phone' && (
          <FontAwesome name={'phone'} style={[styles.icon, { paddingHorizontal: RFValue(10) }]} />
        )}
        {props.type === 'name' && (
          <FontAwesome name={'user'} style={[styles.icon, { paddingHorizontal: RFValue(10) }]} />
        )}
        <TextInput
          {...props}
          ref={ref}
          style={[
            styles.textInput,
            { paddingHorizontal: !props.showIcon && props.type !== 'password' ? RFValue(10) : 0 },
            props.textInputStyles,
          ]}
          placeholder={props.placeholder ?? null}
          placeholderTextColor={'#997878'}
          secureTextEntry={props.type === 'password' && secureTextEntry}
        />
        {props.error && (
          <TouchableOpacity style={styles.iconWrapper} onPress={props.onClose}>
            <MaterialIcons name={'error-outline'} style={[styles.icon, { color: '#C00000' }]} />
          </TouchableOpacity>
        )}
        {props.type === 'password' && (
          <TouchableOpacity style={styles.iconWrapper} onPress={toggleSecureTextEntry}>
            <FontAwesome name={secureTextEntry ? 'eye' : 'eye-slash'} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

export default InputText;

const styles = StyleSheet.create({
  container: {
    // padding: RFValue(20),

    marginBottom: RFValue(20),
  },
  textInputWrapper: {
    height: RFValue(50, 668),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: RFValue(5),
    backgroundColor: '#FFFFFF',
    borderColor: '#C00000',
    borderWidth: 2,
  },
  textInput: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(12),
    flex: 1,
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#555555',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(12),
    // paddingVertical: RFValue(0),
    paddingHorizontal: RFValue(10),
  },
  naira: {
    color: '#C00000',
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(16),
    paddingLeft: RFValue(10),
    // textAlign: 'right',
  },
  error: {
    color: '#C00000',
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(12),
    paddingHorizontal: RFValue(10),
    textAlign: 'right',
    position: 'absolute',
    right: 0,
  },
  value: {
    color: '#000000',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(12),
  },
  iconWrapper: {
    paddingHorizontal: RFValue(10),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { color: '#E2C2C2', fontSize: RFValue(20) },
});
