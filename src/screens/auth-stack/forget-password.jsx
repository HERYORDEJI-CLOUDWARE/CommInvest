import React, { useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNavigation } from '@react-navigation/native';
import AuthNavbar from '../../components/auth-navbar';
import ButtonPrimary from '../../components/button-primay';
import ButtonText from '../../components/button-text';
import InputText from '../../components/input-text';
import { useForm, Controller } from 'react-hook-form';
import {
  changePasswordRequest,
  fetchUserRequest,
  forgetPasswordRequest,
  loginRequest,
} from '../../api/auth-services';
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

export default function ForgetPassword() {
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
    forgetPasswordRequest({
      email: getValues('email'),
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
      <AuthNavbar title={'Forgot Password'} />
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
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <InputText
                label={'Email'}
                type={'email'}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.email?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Email is required!',
              },
              pattern: {
                value: /\S+@\S+\.\S+/,

                message: 'Not a valid email',
              },
              validate: value => value === getValues('email') || 'Email is not correct',
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
