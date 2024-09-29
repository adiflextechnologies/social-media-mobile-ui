import React from 'react';
import {Actions, Editor, Header, Tools} from './components';
import {colors} from '../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import HooksProvider from './hooks';
import StoreProvider from './store';
import {RecoilRoot} from 'recoil';
import Templates from './components/tools/components/templates/Templates';

const Main = () => {
  return (
    <RecoilRoot>
      <StoreProvider>
        <HooksProvider>
          <StatusBar style="light" backgroundColor={colors.accent} />
          <SafeAreaView style={styles.container}>
            <Header />
            <Templates />
            <Editor />
            <Tools />
            <Actions />
          </SafeAreaView>
        </HooksProvider>
      </StoreProvider>
    </RecoilRoot>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.accent,
  },
});
