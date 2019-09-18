import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Root from './Root';
import configureStore from './store';

const store = configureStore();

export default class App extends Component {  
  render() {
    return (
      <Provider store={ store }>
        <Root />
      </Provider>
    );
  }
}


