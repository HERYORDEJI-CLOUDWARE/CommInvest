import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FilePickerManager from 'react-native-file-picker';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import ButtonPrimary from '../../components/button-primay';
import StackNavbar from '../../components/stack-navbar';
import InputText from '../../components/input-text';
import { useForm, Controller } from 'react-hook-form';
import { RootContext } from '../../context-api/root-context';
import { AuthContext } from '../../context-api/auth-context';
import { IndicatorContext } from '../../context-api/indicator-context';
import {
  handleErrorIndicator,
  handleHideIndicator,
  handleLoadingIndicator,
  handleSuccessIndicator,
} from '../../context-api/indicator-context/handlers';
import { supportRequest } from '../../api/support-services';
import { editProfileRequest, fetchUserRequest } from '../../api/auth-services';
import { handleLoadUser } from '../../context-api/root-context/handlers';

export default function EditProfile() {
  const [document, setDocument] = useState(null);
  const navigation = useNavigation();

  const { state: indicatorState, dispatch: indicatorDispatch } = useContext(IndicatorContext);
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);
  const {
    user_details: { user_firstname, user_lastname, user_email, user_phone, user_avatar, user_id },
  } = rootState;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      user_firstname,
      user_lastname,
      user_email,
      user_phone,
      user_avatar,
    },
  });

  const selectDocument = () =>
    FilePickerManager.showFilePicker(null, response => {
      if (response.didCancel) {
        // console.log('User cancelled file picker');
      } else if (response.error) {
        // console.log('FilePickerManager Error: ', response.error);
      } else {
        setDocument(response);
      }
    });

  const fetchUser = () =>
    fetchUserRequest({ user_id })
      .then(res => {
        const { status, message, data } = res;
        if (Boolean(status)) {
          reset();
          rootDispatch(handleLoadUser({ ...data }));
          indicatorDispatch(handleHideIndicator({ message }));
          setDocument(null);
          navigation.goBack();
        } else {
          indicatorDispatch(handleErrorIndicator({ message }));
        }
      })
      .catch(err => {});

  const onSubmit = () => {
    indicatorDispatch(handleLoadingIndicator({ title: 'Submitting...' }));
    editProfileRequest({
      user_id,
      first_name: getValues('user_firstname'),
      last_name: getValues('user_lastname'),
      phone: getValues('user_phone'),
      avatar: Boolean(document?.path) ? document : null,
    }).then(res => {
      const { status, message } = res;
      if (Boolean(status)) {
        indicatorDispatch(handleSuccessIndicator({ message }));
        fetchUser();
      } else {
        indicatorDispatch(handleErrorIndicator({ message }));
      }
    });
  };

  return (
    <SafeAreaView>
      <StackNavbar title={'Edit Profile'} />
      <ScrollView style={styles.content} contentInsetAdjustmentBehavior="automatic">
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'First Name is required!',
            },
            pattern: {
              value: /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/,

              message: 'Not a valid name',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label={'First' + ' Name'}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors?.user_firstname?.message}
            />
          )}
          name={'user_firstname'}
        />
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Last Name is required!',
            },
            pattern: {
              value: /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/,

              message: 'Not a valid name',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label={'Last' + ' Name'}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors?.user_lastname?.message}
            />
          )}
          name={'user_lastname'}
        />
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Phone Number is required!',
              minLength: 11,
              maxLength: 11,
            },
            pattern: {
              value: /^[+-]?\d*(?:[.,]\d*)?$/,
              message: 'Not a valid phone number',
            },
          }}
          render={({ field }) => (
            <InputText
              {...field}
              label={'Phone Number'}
              keyboardType={'phone-pad'}
              error={errors?.user_phone?.user_phone}
              onChangeText={field.onChange}
              value={field.value}
              containerStyle={{ marginBottom: RFValue(10) }}
            />
          )}
          name={'user_phone'}
        />
        <TouchableOpacity onPress={selectDocument}>
          <InputText label={'Select Document'} editable={false} value={document?.fileName} />
        </TouchableOpacity>
      </ScrollView>
      <ButtonPrimary
        onPress={handleSubmit(onSubmit)}
        title={'Submit'}
        containerStyles={{ margin: RFValue(20) }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { padding: RFValue(20) },
});
