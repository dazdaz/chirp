import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserInput from './UserInput';
import Dimensions from 'Dimensions';
import { LoginAsync, RegisterAsync } from 'utils/RestService'
// import { LoginAsync, RegisterAsync } from '../utils/RestService'

import usernameImg from 'res/username.png';
import passwordImg from 'res/password.png';

import {
    ScrollView,
    StyleSheet,
    Image,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "hieunhu",
            password: "123456",
            color: "#ff0000",
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        };
    }

    _onPress() {
        if (this.props.title === "Login") {
            this._login();
        }
        else if (this.props.title === "Register") {
            this._register();
        }

        this.forceUpdate();
    }

    async _login() {
        var respJson = await LoginAsync(this.state.username, this.state.password);
        if (respJson) {
            if (respJson.state === 'success') {
                alert('You have logged in successfully!');
                this.props.onSuccess(respJson.user);
            }
            else {
                alert(respJson.message);
            }
        }
    }

    async _register() {
        var respJson = await RegisterAsync(this.state.username, this.state.password);
        if (respJson) {
            if (respJson.state === 'success') {
                alert('You have registered successfully!');
                this.props.onSuccess(respJson.user);
            }
            else {
                alert(respJson.message);
            }
        }
    }

    onLayout(e) {
        // Ensure width & height values are updated during orientational change. 
        // Portrait & Landscape
        this.setState({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.picture} onLayout={this.onLayout.bind(this)}>
                <KeyboardAvoidingView behavior='padding'
                    style={styles.container}>

                    {/* <TextInput
                        style={{ width: this.state.width - 40, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                        onChangeText={(username) => this.setState({ username })}
                    />
                    <TextInput
                        style={{ width: this.state.width - 40, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                    /> */}

                    <UserInput source={usernameImg}
                        placeholder='Username'
                        autoCapitalize={'none'}
                        value={this.state.username}
                        returnKeyType={'done'}
                        onChangeText={(username) => this.setState({ username })}
                        autoCorrect={false} />
                    <UserInput source={passwordImg}
                        secureTextEntry={true}
                        placeholder='Password'
                        value={this.state.password}
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        onChangeText={(password) => this.setState({ password })}
                        autoCorrect={false} />

                    <Button
                        onPress={this._onPress.bind(this)}
                        // Everytime a component give its function for a child to call, we need to call bind.
                        title={this.props.title}
                        accessibilityLabel="Learn more about this purple button"
                    />

                </KeyboardAvoidingView>
            </ScrollView>);
    }
}

Form.propTypes = {
    title: PropTypes.string.isRequired,
};


const styles = StyleSheet.create({
    container: {
        marginBottom: 100,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    picture: {
        flex: 1,
        width: null,
        height: null,
        // resizeMode: 'cover',
    },
});