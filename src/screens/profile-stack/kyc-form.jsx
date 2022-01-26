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
import { RFValue } from 'react-native-responsive-fontsize';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import AuthNavbar from '../../components/auth-navbar';
import ButtonPrimary from '../../components/button-primay';
import ButtonText from '../../components/button-text';
import InputText from '../../components/input-text';
import { useForm, Controller } from 'react-hook-form';
import { registerKycRequest } from '../../api/auth-services';
import { RootContext } from '../../context-api/root-context';
import moment from 'moment';
import {
  handleErrorIndicator,
  handleSuccessIndicator,
} from '../../context-api/indicator-context/handlers';
import { IndicatorContext } from '../../context-api/indicator-context';
import { handleLoadUser } from '../../context-api/root-context/handlers';
import FilePickerManager from 'react-native-file-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MenuModal from '../../components/menu-modal';
import { countryList, gender, employmentDetails, nationIds } from '../../api/datas';

export default function KycForm() {
  const navigation = useNavigation();
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);
  const { state: indicatorState, dispatch: indicatorDispatch } = useContext(IndicatorContext);
  const [uploadCard, setUploadCard] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuModal, setMenuModal] = useState({
    isVisible: false,
    field: null,
    data: null,
    type: null,
  });

  const moment18y = moment().subtract(18, 'years');

  const {
    user_details: { user_firstname, user_lastname, user_email, user_phone, user_avatar, user_id },
  } = rootState;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      user_firstname,
      user_lastname,
      user_email,
      user_phone,
    },
  });

  const selectDocument = () =>
    FilePickerManager.showFilePicker(null, response => {
      const { fileName } = response;
      if (response.didCancel) {
        // console.log('User cancelled file picker');
      } else if (response.error) {
        // console.log('FilePickerManager Error: ', response.error);
      } else {
        setUploadCard(response);
        setValue('upload_card', fileName);
      }
    });

  const onSelectMenu = ({ value }) => {
    setValue(menuModal.field, value);
    setMenuModal({ isVisible: false, field: null, data: null, type: null });
  };

  const onSubmit = () => {
    registerKycRequest({
      user_id,
      dob: getValues('dob'),
      citizenship: getValues('citizenship'),
      country_of_birth: getValues('cob'),
      next_of_kin: getValues('nok'),
      country_of_tax: getValues('cot'),
      tax_id: getValues('tax_id'),
      residency: getValues('residency'),
      resident_address: getValues('residential_address'),
      employment_status: getValues('employment_details'),
      national_id: getValues('national_id_number'),
      upload_card: getValues('upload_card'),
    }).then(res => {
      const { status, message } = res;
      if (Boolean(status)) {
        indicatorDispatch(handleSuccessIndicator({ message }));
        rootDispatch(
          handleLoadUser({
            ...rootState,
            user_details: { ...rootState.user_details, kyc_status: 'pending' },
          }),
        );
        navigation.goBack();
      } else {
        indicatorDispatch(handleErrorIndicator({ message }));
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthNavbar title={'KYC Form'} />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.containerContent}
        contentInsetAdjustmentBehavior={'automatic'}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View>
          {/* first name */}
          <Controller
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                label={'First Name'}
                error={errors?.user_firstname?.message}
                onChangeText={field.onChange}
                value={field.value}
                containerStyle={{ marginBottom: RFValue(10) }}
                editable={false}
              />
            )}
            name={'user_firstname'}
          />
          {/* last name */}
          <Controller
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                label={'Last Name'}
                error={errors?.user_lastname?.message}
                onChangeText={field.onChange}
                value={field.value}
                containerStyle={{ marginBottom: RFValue(10) }}
                editable={false}
              />
            )}
            name={'user_lastname'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                label={'Email'}
                error={errors?.user_email?.message}
                onChangeText={field.onChange}
                value={field.value}
                containerStyle={{ marginBottom: RFValue(10) }}
                editable={false}
              />
            )}
            name={'user_email'}
          />
          {/* dob */}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Date of birth is required!',
              },
            }}
            render={({ field }) => (
              <TouchableOpacity
                onPress={() => setMenuModal({ isVisible: true, field: 'dob', type: 'date' })}
              >
                <InputText
                  {...field}
                  label={'Date of birth'}
                  error={errors?.dob?.message}
                  onChangeText={field.onChange}
                  value={field.value ? moment(field.value).format('LL') : null}
                  containerStyle={{ marginBottom: RFValue(10) }}
                  editable={false}
                />
              </TouchableOpacity>
            )}
            name={'dob'}
          />
          {/* phone number */}
          <Controller
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                label={'Phone Number'}
                keyboardType={'phone-pad'}
                error={errors?.user_phone?.message}
                onChangeText={field.onChange}
                value={field.value}
                containerStyle={{ marginBottom: RFValue(10) }}
                editable={false}
              />
            )}
            name={'user_phone'}
          />
          {/* country of birth */}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Date of birth is required!',
              },
            }}
            render={({ field }) => (
              <TouchableOpacity
                onPress={() => setMenuModal({ isVisible: true, field: 'cob', type: 'country' })}
              >
                <InputText
                  {...field}
                  label={'Country of birth'}
                  error={errors?.cob?.message}
                  onChangeText={field.onChange}
                  value={field.value}
                  containerStyle={{ marginBottom: RFValue(10) }}
                  editable={false}
                />
              </TouchableOpacity>
            )}
            name={'cob'}
          />
          {/* Citizenship */}
          <Controller
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                label={'Citizenship'}
                error={errors?.citizenship?.message}
                onChangeText={field.onChange}
                value={field.value}
                containerStyle={{ marginBottom: RFValue(10) }}
              />
            )}
            name={'citizenship'}
          />
          {/* country of tax */}
          <Controller
            control={control}
            render={({ field }) => (
              <TouchableOpacity
                onPress={() => setMenuModal({ isVisible: true, field: 'cot', type: 'country' })}
              >
                <InputText
                  {...field}
                  label={'Country of tax'}
                  error={errors?.cot?.message}
                  onChangeText={field.onChange}
                  value={field.value}
                  containerStyle={{ marginBottom: RFValue(10) }}
                  editable={false}
                />
              </TouchableOpacity>
            )}
            name={'cot'}
          />
          {/* TAX ID */}
          <Controller
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                label={'TAX ID'}
                error={errors?.tax_id?.message}
                onChangeText={field.onChange}
                value={field.value}
                containerStyle={{ marginBottom: RFValue(10) }}
              />
            )}
            name={'tax_id'}
          />
          {/* Residency */}
          <Controller
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                label={'Residency'}
                error={errors?.residency?.message}
                onChangeText={field.onChange}
                value={field.value}
                containerStyle={{ marginBottom: RFValue(10) }}
              />
            )}
            name={'residency'}
          />
          {/* Residential Address */}
          <Controller
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                label={'Residential Address'}
                error={errors?.residential_address?.message}
                onChangeText={field.onChange}
                value={field.value}
                containerStyle={{ marginBottom: RFValue(10) }}
              />
            )}
            name={'residential_address'}
          />
          {/* Gender */}
          <Controller
            control={control}
            render={({ field }) => (
              <TouchableOpacity
                onPress={() =>
                  setMenuModal({ isVisible: true, field: 'gender', data: gender, type: 'menu' })
                }
              >
                <InputText
                  {...field}
                  label={'Gender'}
                  error={errors?.gender?.message}
                  onChangeText={field.onChange}
                  value={field.value}
                  containerStyle={{ marginBottom: RFValue(10) }}
                  editable={false}
                />
              </TouchableOpacity>
            )}
            name={'gender'}
          />
          {/* Employment Details */}
          <Controller
            control={control}
            render={({ field }) => (
              <TouchableOpacity
                onPress={() =>
                  setMenuModal({
                    isVisible: true,
                    field: 'employment_details',
                    data: employmentDetails,
                    type: 'menu',
                  })
                }
              >
                <InputText
                  {...field}
                  label={'Employment Details'}
                  error={errors?.employment_details?.message}
                  onChangeText={field.onChange}
                  value={field.value}
                  containerStyle={{ marginBottom: RFValue(10) }}
                  editable={false}
                />
              </TouchableOpacity>
            )}
            name={'employment_details'}
          />
          {/* Next of kin */}
          <Controller
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                label={'Next of kin'}
                error={errors?.nok?.message}
                onChangeText={field.onChange}
                value={field.value}
                containerStyle={{ marginBottom: RFValue(10) }}
              />
            )}
            name={'nok'}
          />
          {/* National ID Number */}
          <Controller
            control={control}
            render={({ field }) => (
              <TouchableOpacity
                onPress={() =>
                  setMenuModal({
                    isVisible: true,
                    field: 'national_id_number',
                    data: nationIds,
                    type: 'menu',
                  })
                }
              >
                <InputText
                  {...field}
                  label={`National ID Number`}
                  error={errors?.national_id_number?.message}
                  onChangeText={field.onChange}
                  value={field.value}
                  containerStyle={{ marginBottom: RFValue(10) }}
                  editable={false}
                />
              </TouchableOpacity>
            )}
            name={'national_id_number'}
          />
          {/* Official ID (National ID, Driver's Licence, Voter's Card) */}
          <Controller
            control={control}
            render={({ field }) => (
              <TouchableOpacity onPress={selectDocument}>
                <InputText
                  {...field}
                  label={`Official ID (National ID, Driver's Licence, Voter's Card)`}
                  error={errors?.upload_card?.message}
                  onChangeText={field.onChange}
                  value={field.value}
                  containerStyle={{ marginBottom: RFValue(10) }}
                  editable={false}
                />
              </TouchableOpacity>
            )}
            name={'upload_card'}
          />
        </View>
      </ScrollView>
      <ButtonPrimary
        onPress={() => {}}
        title={'Submit'}
        containerStyles={{ margin: RFValue(10) }}
      />
      {menuModal.type === 'menu' && (
        <MenuModal
          {...menuModal}
          onSelect={onSelectMenu}
          onClose={() => setMenuModal({ isVisible: false, field: null, data: null })}
        />
      )}
      {menuModal.type === 'country' && (
        <CountryPicker
          visible={menuModal.isVisible}
          onSelect={value => onSelectMenu({ value: value.name })}
          countryCode={'NG'}
        />
      )}
      {menuModal.type === 'date' && (
        <DateTimePickerModal
          isVisible={menuModal.isVisible}
          mode={'date'}
          onConfirm={value => onSelectMenu({ value })}
          onCancel={() => setMenuModal({ isVisible: false, field: null, data: null })}
          maximumDate={new Date(moment18y)}
        />
      )}
    </SafeAreaView>
  );
}
// name-phone-pad

// console.log('moment', moment().subtract(18, 'years'));
// console.log('moment', new Date('2004-01-25T21:45:07.975Z').toISOString());

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { flex: 1 },
  containerContent: { padding: RFValue(20) },
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

const natID = ['NIN', 'BVN', 'National Insurance Number', 'Social Security Number', 'Others'];
