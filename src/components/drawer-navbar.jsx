import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';

const notchHeight = StatusBar.currentHeight;

export default function DrawerNavbar(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'transparent'} />
      <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.toggleDrawer()}>
        <FontAwesome name="align-left" style={styles.icon} />
      </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#C00000',
  },
  titleWrapper: {
    // padding: RFValue(20),
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(20),
  },
  iconWrapper: {
    paddingHorizontal: RFValue(20),
  },
  icon: { color: '#FFFFFF', fontSize: RFValue(20) },
});
