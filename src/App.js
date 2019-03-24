import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';

import store, { RouterWithState } from '@gl/store';


export default class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <RouterWithState />
            </Provider>
        );
    }
}
