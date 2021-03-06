/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import RootStack from './src/navigation/root-stack';
import { NavigationContainer } from '@react-navigation/native';
import RootContextProvider from './src/context-api/root-context';
import IndicatorContextProvider from './src/context-api/indicator-context';
// import { API_TOKEN } from '@env';

export default function App() {
  return (
    <RootContextProvider>
      <IndicatorContextProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </IndicatorContextProvider>
    </RootContextProvider>
  );
}
