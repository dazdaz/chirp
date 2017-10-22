import React, { Component } from 'react';
import Wallpaper from './Wallpaper';
import Form from './Form';
import { NavigationActions } from 'react-navigation'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess(userJson) {
    const { params } = this.props.navigation.state;
    params.setUser(userJson);
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  }

  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <Wallpaper>
        <Form title="Login" onSuccess={this.onSuccess} />
      </Wallpaper>
    );
  }
}