import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Line,
  Tooltip,
} from 'react-native-responsive-linechart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerNavbar from '../../components/drawer-navbar';

const { width, height } = Dimensions.get('window');

export default function AccountMonitor() {
  const data1 = [
    { x: -2, y: 1 },
    { x: -1, y: 0 },
    { x: 8, y: 13 },
    { x: 9, y: 11.5 },
    { x: 10, y: 12 },
  ];

  const data2 = [
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
    { x: 1, y: 7 },
    { x: 8, y: 12 },
    { x: 9, y: 13.5 },
    { x: 10, y: 18 },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <DrawerNavbar title={'Account Monitor'} />
      <Chart
        style={{
          height: height * 0.5,
          // height: RFValue(220, 668),
          // width: width - RFValue(25),
          backgroundColor: '#C000000',
          // margin: RFValue(20),
        }}
        xDomain={{ min: -2, max: 10 }}
        yDomain={{ min: -2, max: 20 }}
        padding={{ left: RFValue(20), top: RFValue(10), bottom: RFValue(10), right: RFValue(10) }}
        viewport={{ size: { width: RFValue(3, 668) } }}
        // viewport={{
        //   initialOrigin: { x: 0, y: 4 },
        //   size: { width: width - RFValue(25), height: 200 },
        // }}
      >
        <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
        <HorizontalAxis tickCount={9} />
        <Line data={data1} smoothing="none" theme={{ stroke: { color: 'red', width: 1 } }} />
        <Line
          data={data2}
          smoothing="cubic-spline"
          theme={{ stroke: { color: 'blue', width: 1 } }}
          tooltipComponent={<Tooltip theme={{ formatter: ({ y }) => y.toFixed(2) }} />}
        />
      </Chart>
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

// npm install --save react-native-modal react-native-fs numbro react-native-animatable && react-native link react-native-fs && npm start
