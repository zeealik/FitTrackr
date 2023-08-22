import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ScreenNavigation from './navigation/screen-navigation';

const App = () => {
  return (
    <NavigationContainer>
      <ScreenNavigation />
    </NavigationContainer>
  );
};

export default App;
