import React, { Component, PropTypes } from 'react';
import UserInput from './UserInput';
import Dimensions from 'Dimensions';
import { LoginAsync, RegisterAsync } from 'utils/RestService'

import usernameImg from 'res/username.png';
import passwordImg from 'res/password.png';

import {
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
        this._onPress = this._onPress.bind(this);
        this.state = {
            username: "hieunhu",
            password: "123456",
            color: "#ff0000",
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

    async _login(){
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

    async _register(){
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

    render() {
        return (

            <KeyboardAvoidingView behavior='padding'
                style={styles.container}>
                {/* <TextInput
                    style={{ width: DEVICE_WIDTH - 40, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                    onChangeText={(username) => this.setState({ username })}
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
                {
                /* <TextInput
                    style={{ width: DEVICE_WIDTH - 40, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                /> */}
                <Button
                    onPress={this._onPress}
                    title={this.props.title}
                    color={this.state.color}
                    accessibilityLabel="Learn more about this purple button"
                />

            </KeyboardAvoidingView>);
    }
}

Form.propTypes = {
    title: PropTypes.string.isRequired,
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        marginTop: 150,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    btnEye: {
        position: 'absolute',
        top: 55,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
});