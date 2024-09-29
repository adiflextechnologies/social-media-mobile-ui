import { StyleSheet } from 'react-native';
import React from 'react';
import RouteContainer from './src';
import { SessionProvider } from './src/hook/useSession';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SheetProvider } from 'react-native-actions-sheet';
import { store } from './src/store';
import { Provider } from 'react-redux';

const App = () => {
	return (
		<GestureHandlerRootView style={styles.container}>
			<SheetProvider>
				<SafeAreaProvider>
					<RootSiblingParent>
						<Provider store={store}>
								<SessionProvider>
									<RouteContainer />
								</SessionProvider>
						</Provider>
					</RootSiblingParent>
				</SafeAreaProvider>
			</SheetProvider>
		</GestureHandlerRootView>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
