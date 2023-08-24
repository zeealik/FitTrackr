import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ScreenNavigation from './navigation/screen-navigation';
import { persistor, store } from './store';

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <ScreenNavigation />
        </NavigationContainer>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
