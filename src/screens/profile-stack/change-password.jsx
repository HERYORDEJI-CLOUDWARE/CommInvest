import React, { useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNavigation } from '@react-navigation/native';
import AuthNavbar from '../../components/auth-navbar';
import ButtonPrimary from '../../components/button-primay';
import ButtonText from '../../components/button-text';
import InputText from '../../components/input-text';
import { useForm, Controller } from 'react-hook-form';
import { changePasswordRequest, fetchUserRequest, loginRequest } from '../../api/auth-services';
import { AuthContext } from '../../context-api/auth-context';
import { IndicatorContext } from '../../context-api/indicator-context';
import {
  handleErrorIndicator,
  handleHideIndicator,
  handleLoadingIndicator,
  handleSuccessIndicator,
} from '../../context-api/indicator-context/handlers';
import { handleLoadUser } from '../../context-api/root-context/handlers';
import { RootContext } from '../../context-api/root-context';
import StackNavbar from '../../components/stack-navbar';

const _ = {
  email: 'tesft@email.com', //tes@email.com
  password: '11111111',
};

export default function ChangePassword() {
  const navigation = useNavigation();
  const { state: indicatorState, dispatch: indicatorDispatch } = useContext(IndicatorContext);
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);
  const {
    user_details: { user_id, account_name, account_no, user_firstname },
  } = rootState;

  // console.log('indicatorState', indicatorState);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = () => {
    indicatorDispatch(handleLoadingIndicator({ title: 'Submitting...' }));
    changePasswordRequest({
      current_password: getValues('old_password'),
      new_password: getValues('old_password'),
      user_id,
    }).then(res => {
      const { status, message } = res;
      if (Boolean(status)) {
        indicatorDispatch(handleSuccessIndicator({ message }));
        reset();
        navigation.goBack();
      } else {
        indicatorDispatch(handleErrorIndicator({ message }));
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StackNavbar title={'Change Password'} />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.containerContent}
        contentInsetAdjustmentBehavior={'automatic'}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View>
          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange, value, onBlur } }) => (
              <InputText
                label={'Old Password'}
                type={'password'}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.old_password?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Password is required!',
              },
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            }}
          />
          <Controller
            control={control}
            name="new_password"
            render={({ field: { onChange, value, onBlur } }) => (
              <InputText
                label={'New Password'}
                type={'password'}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.new_password?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Password is required!',
              },
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            }}
          />
          <Controller
            control={control}
            name="new_password_2"
            render={({ field: { onChange, value, onBlur } }) => (
              <InputText
                label={'Confirm Old Password'}
                type={'password'}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.new_password_2?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Password is required!',
              },
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
              validate: value => value === getValues('new_password') || 'Password is not correct',
            }}
          />
          <ButtonPrimary
            // onPress={() =>
            //   indicatorDispatch(handleSuccessIndicator({ message: 'Payment Loading' }))
            // }
            onPress={handleSubmit(onSubmit)}
            title={'Submit'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { padding: RFValue(20), flex: 1 },
  containerContent: { flex: 1 },
  iconAddWrapper: {
    height: RFValue(50, 668),
    width: RFValue(50, 668),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555555',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  new: { color: '#999999', fontSize: RFValue(12), fontFamily: 'Poppins-Regular' },
  signup: { color: '#C00000', fontSize: RFValue(12), fontFamily: 'Poppins-SemiBold' },
});

// npm install --save react-native-modal react-native-fs numbro react-native-animatable && react-native link react-native-fs && npm start
