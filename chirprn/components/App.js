import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    AppRegistry,
    Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Login from 'login/Login';
import Register from 'login/Register';

const ChirpApp = StackNavigator({
    Home: { screen: Home },
    Login: { screen: Login },
    Register: { screen: Register },
});
AppRegistry.registerComponent('chirprn', () => ChirpApp);