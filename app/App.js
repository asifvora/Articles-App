'use strict';

import React, { Component } from 'react';
import AppNavigation from './components/navigation';
import { Provider } from 'react-redux';
import appStore from './store/appStore';

class App extends React.Component {
  render() {
    return (
      <Provider store={appStore}>
        <AppNavigation />
      </Provider>
    )
  }
}

export default App;



