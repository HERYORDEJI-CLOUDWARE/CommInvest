import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerNavbar from '../../components/drawer-navbar';
import InputText from '../../components/input-text';
import { RootContext } from '../../context-api/root-context';
import ButtonText from '../../components/button-text';
import KycInform from '../../components/kyc-inform';
import { IndicatorContext } from '../../context-api/indicator-context';
import {
  handleHideKycIndicator,
  handleShowKycIndicator,
} from '../../context-api/indicator-context/handlers';

export default function Profile() {
  const navigation = useNavigation();
  const { state: indicatorState, dispatch: indicatorDispatch } = useContext(IndicatorContext);
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);
  const {
    user_details: {
      user_firstname,
      user_lastname,
      user_email,
      create_date,
      user_phone,
      user_avatar,
      kyc_status,
    },
  } = rootState;
  const { showKyc } = indicatorState;

  useEffect(() => {
    if (!kyc_status) {
      indicatorDispatch(handleShowKycIndicator());
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerNavbar title={'Profile'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.imageWrapper}>
            {user_avatar ? (
              <Image source={{ uri: user_avatar }} style={styles.image} />
            ) : (
              <Image source={require('../../assets/images/user_avatar.png')} style={styles.image} />
            )}
          </View>
          <Text style={styles.name}>{user_firstname + ' ' + user_lastname}</Text>
          {/*<Text style={styles.job}>Developer</Text>*/}
        </View>
        <View style={styles.content}>
          {/*<InputText label={'Lives in'} editable={false} value={'Santorini, Greece'} />*/}
          <InputText label={'Phone Number'} editable={false} value={user_phone} />
          {/*<InputText label={'Gender'} editable={false} value={'Male'} />*/}
          <InputText label={'Email'} editable={false} value={user_email} />
          <InputText label={'Joined'} editable={false} value={create_date} />
          {!kyc_status && (
            <ButtonText
              title={'Submit KYC Form ⇉'}
              onPress={() => navigation.navigate('KYC Form')}
            />
          )}
          <ButtonText
            title={'Change Password ⇉'}
            onPress={() => navigation.navigate('Change Password')}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.iconAddWrapper}
        onPress={() => navigation.navigate({ name: 'Edit Profile', params: {} })}
      >
        <MaterialCommunityIcons name={'account-edit-outline'} style={styles.iconAdd} />
      </TouchableOpacity>
      <KycInform
        isVisible={!kyc_status && showKyc}
        onAccept={() => {
          navigation.navigate('KYC Form');
          indicatorDispatch(handleHideKycIndicator());
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { paddingHorizontal: RFValue(20), paddingBottom: RFValue(20) },
  profileCard: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#555555',
    margin: RFValue(20),
  },
  imageWrapper: {
    height: RFValue(100, 668),
    width: RFValue(100, 668),
    borderRadius: RFValue(100, 668),
    borderWidth: 4,
    borderColor: '#FBE4E4',
    overflow: 'hidden',
  },
  image: {
    height: null,
    width: null,
    flex: 1,
  },

  iconAddWrapper: {
    height: RFValue(50, 668),
    width: RFValue(50, 668),
    borderRadius: RFValue(50),
    margin: RFValue(20),
    elevation: RFValue(3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C00000',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  iconAdd: { color: '#FFFFFF', fontSize: RFValue(25) },
  name: {
    color: '#000000',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(12),
  },
  job: {
    color: '#555555',
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10),
  },
});

// npm install --save react-native-modal react-native-fs numbro react-native-animatable && react-native link react-native-fs && npm start

const user_details = {
  account_bank: 'WEMA BANK',
  account_name: 'ade bayo',
  account_no: '7350209840',
  account_note: 'Please make a bank transfer to ade bayo  FLW',
  create_date: '10-01-2022 07:11:29',
  link_expire: '',
  link_key: '',
  rave_txRef: 'vta80094715',
  update_date: '20-01-2022 05:19:51',
  user_avatar: 'profile_avatar/2736bb869f2235146304448403aad2e5.jpg',
  user_bvn: '12345678901',
  user_disabled: '1',
  user_email: 'tesft@email.com',
  user_firstname: 'ade',
  user_id: '2',
  user_lastname: 'bayo',
  user_password: '$2y$10$6/Y0ZyDroHBsvVQxvcs9y.qKDj61MiLYVjilNisZftC.tsraYapNG',
  user_phone: '+2348123456789',
  user_status: '1',
};
