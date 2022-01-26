import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';

const notchHeight = StatusBar.currentHeight;
const { width, height } = Dimensions.get('window');

export default function AuthNavbar(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={'transparent'} />
      <View style={styles.logoWrapper}>
        <Image source={require('../assets/images/logos/bootsplash_logo.png')} style={styles.logo} />
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: RFValue(50),
    paddingTop: RFValue(20) + notchHeight,
    paddingHorizontal: RFValue(20),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#555555',
  },
  titleWrapper: {
    // padding: RFValue(20),
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(20),
  },
  logoWrapper: {
    height: RFValue(30, 668),
    width: width * 0.4,
  },
  logo: { height: null, width: null, flex: 1, resizeMode: 'contain' },
});
