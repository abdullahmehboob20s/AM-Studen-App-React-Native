import React from 'react';
import MainNavigator from './Navigations/MainNavigator';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import AllReducers from './redux/reducers/AllReducers';

let store = createStore(AllReducers, applyMiddleware(Thunk));

let App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
