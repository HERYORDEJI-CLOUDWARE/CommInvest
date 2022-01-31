import React, { useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNavigation } from '@react-navigation/native';
import AuthNavbar from '../../components/auth-navbar';
import ButtonPrimary from '../../components/button-primay';
import ButtonText from '../../components/button-text';
import InputText from '../../components/input-text';
import { useForm, Controller } from 'react-hook-form';
import { fetchUserRequest, loginRequest } from '../../api/auth-services';
import { AuthContext } from '../../context-api/auth-context';
import { IndicatorContext } from '../../context-api/indicator-context';
import {
  handleErrorIndicator,
  handleHideIndicator,
  handleLoadingIndicator,
  handleSuccessIndicator,
} from '../../context-api/indicator-context/handlers';
import { handleClearRoot, handleLoadUser } from '../../context-api/root-context/handlers';
import { RootContext } from '../../context-api/root-context';

const _ = {
  email: 'tesft@email.com', //tes@email.com
  password: '11111111',
};

export default function Login() {
  const navigation = useNavigation();
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: indicatorState, dispatch: indicatorDispatch } = useContext(IndicatorContext);
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);

  // console.log('indicatorState', indicatorState);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = () => {
    indicatorDispatch(handleLoadingIndicator({}));
    // loginRequest({ email: getValues('email'), password: getValues('password') })
    loginRequest({ ..._ })
      .then(res => {
        const { status, message, data } = res;
        // console.log('res', res);
        if (Boolean(status)) {
          fetchUserRequest({ user_id: data?.user_id })
            .then(res => {
              const { status, message, data } = res;
              if (Boolean(status)) {
                reset();
                rootDispatch(handleLoadUser({ ...data }));
                indicatorDispatch(handleHideIndicator({ message }));
              } else {
                indicatorDispatch(handleErrorIndicator({ message }));
              }
            })
            .catch(err => {});
        } else {
          indicatorDispatch(handleErrorIndicator({ message }));
        }
      })
      .catch(err => {});
  };

  useEffect(() => {
    // onSubmit();
    // rootDispatch(handleClearRoot());
    fetchUserRequest({ user_id: 2 })
      .then(res => {
        const { status, message, data } = res;
        if (Boolean(status)) {
          reset();
          rootDispatch(handleLoadUser({ ...data }));
          indicatorDispatch(handleHideIndicator({ message }));
        } else {
          indicatorDispatch(handleErrorIndicator({ message }));
        }
      })
      .catch(err => {});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AuthNavbar title={'Login'} />
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
            name={'email'}
            render={({ field: { onChange, value, onBlur } }) => (
              <InputText
                label={'Email'}
                type={'email'}
                keyboardType={'email-address'}
                status={'auth'}
                leftIconName={'phone'}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.email?.message}
                containerStyle={{ marginBottom: RFValue(20) }}
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
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <InputText
                label={'Password'}
                type={'password'}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.password?.message}
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
              validate: value => value === getValues('password') || 'Password is not correct',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: RFValue(20),
            }}
          >
            <ButtonText
              title={'Forgot Password?'}
              onPress={() => navigation.navigate('Forget Password')}
            />
            <ButtonText
              title={'Resend Activation Link?'}
              onPress={() => navigation.navigate('Activation Link')}
            />
          </View>
          <ButtonPrimary
            // onPress={() =>
            //   indicatorDispatch(handleSuccessIndicator({ message: 'Payment Loading' }))
            // }
            onPress={onSubmit}
            // onPress={handleSubmit(onSubmit)}
            title={'Login'}
          />
          <View style={{ alignItems: 'center', marginVertical: RFValue(20) }}>
            <ButtonText onPress={() => navigation.navigate({ name: 'Register' })}>
              <Text style={styles.new}>
                New here? <Text style={styles.signup}>Register</Text>
              </Text>
            </ButtonText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { padding: RFValue(20), flex: 1 },
  containerContent: { justifyContent: 'center', flex: 1 },
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
