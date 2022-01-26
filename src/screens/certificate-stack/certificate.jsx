import React from 'react';
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
import FileViewer from 'react-native-file-viewer';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CertificateList from '../../components/certificate-list';
import DrawerNavbar from '../../components/drawer-navbar';

export default function Certificate() {
  const viewCertificate = async () => {
    try {
      await FilePickerManager.showFilePicker(null, async response => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          // console.log('User cancelled file picker');
        } else if (response.error) {
          // console.log('FilePickerManager Error: ', response.error);
        } else {
          await FileViewer.open(response.path);
        }
      });
    } catch (e) {
      // error
      console.log('Working', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerNavbar title={'Certificate'} />
      <CertificateList noDashboard={true} viewCertificate={true} onPress={viewCertificate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { padding: RFValue(20) },
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
  iconAdd: { color: '#999999', fontSize: RFValue(20) },
});
