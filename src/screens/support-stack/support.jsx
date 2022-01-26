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
import { RFValue } from 'react-native-responsive-fontsize';
import ButtonPrimary from '../../components/button-primay';
import DrawerNavbar from '../../components/drawer-navbar';
import InputText from '../../components/input-text';
import { IndicatorContext } from '../../context-api/indicator-context';
import { RootContext } from '../../context-api/root-context';
import {
  handleErrorIndicator,
  handleLoadingIndicator,
  handleSuccessIndicator,
} from '../../context-api/indicator-context/handlers';
import { supportRequest } from '../../api/support-services';
import { Controller, useForm } from 'react-hook-form';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Support() {
  const { dispatch: indicatorDispatch } = useContext(IndicatorContext);
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);

  const {
    user_details: { user_id },
  } = rootState;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({ mode: 'onBlur' });

  const [document, setDocument] = useState(null);
  const [issue, setIssue] = useState(null);
  const [message, setMessage] = useState(null);

  const selectDocument = () =>
    FilePickerManager.showFilePicker(null, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled file picker');
      } else if (response.error) {
        // console.log('FilePickerManager Error: ', response.error);
      } else {
        setDocument(response);
      }
    });
  // console.log('document', document);

  const onSubmit = () => {
    indicatorDispatch(handleLoadingIndicator({ title: 'Submitting...' }));
    supportRequest({
      user_id,
      message: getValues('message'),
      issue: getValues('issue'),
      evidence: Boolean(document?.path) ? document : null,
    }).then(res => {
      const { status, message } = res;
      if (Boolean(status)) {
        indicatorDispatch(handleSuccessIndicator({ message }));
        reset();
        setDocument(null);
      } else {
        indicatorDispatch(handleErrorIndicator({ message }));
      }
    });
  };

  return (
    <SafeAreaView>
      <DrawerNavbar title={'Support'} />
      <ScrollView style={styles.content} contentInsetAdjustmentBehavior="automatic">
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Issue topic is required!',
            },
          }}
          render={({ field }) => (
            <InputText
              {...field}
              label={'What issue are you facing'}
              error={errors?.issue?.message}
              onChangeText={field.onChange}
              value={field.value}
              containerStyle={{ marginBottom: RFValue(10) }}
            />
          )}
          name={'issue'}
        />

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Message topic is required!',
            },
          }}
          render={({ field }) => (
            <InputText
              label={'Comments'}
              error={errors?.message?.message}
              onChangeText={field.onChange}
              value={field.value}
              contentStyles={{ height: RFValue(150, 668) }}
              textInputStyles={{ textAlignVertical: 'top' }}
            />
          )}
          name={'message'}
        />

        <View style={styles.pickerWrapper}>
          <TouchableOpacity onPress={selectDocument} style={{ flex: 1 }}>
            <InputText label={'Select Evidence'} editable={false} value={document?.fileName} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => setDocument(null)}>
            <FontAwesome name={'close'} style={styles.icon} />
          </TouchableOpacity>
        </View>
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
  pickerWrapper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconWrapper: {
    paddingHorizontal: RFValue(10),
    marginLeft: RFValue(10),
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C00000',
    height: RFValue(50),
  },
  icon: { color: '#e8bdbd', fontSize: RFValue(20) },
});
