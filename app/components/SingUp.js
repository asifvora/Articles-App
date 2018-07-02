'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, AsyncStorage, KeyboardAvoidingView, Keyboard, ImageBackground } from 'react-native';
import t from 'tcomb-form-native';
import LocalStorageUtils from '../utils/LocalStorageUtils';

var self;
const Form = t.form.Form;
const validate = t.validate;
const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});
const Password = t.refinement(t.String, (str) => {
  return str.length >= 6; // minimum password length should be 6 symbols
});

function samePasswords(x) {
  return x.password === x.confirmPassword;
}
const User = t.subtype(t.struct({
  firstName: t.String,
  lastName: t.String,
  email: Email,
  password: Password,
  confirmPassword: Password,
}), samePasswords);
User.getValidationErrorMessage = function (value) {
  if (!samePasswords(value)) {
    return 'Password must match.';
  }
};
validate(null, User).isValid();
const options = {
  order: ['firstName', 'lastName', 'email', 'password', 'confirmPassword'],
  auto: 'placeholders',
  fields: {
    firstName: {
      error: 'Please enter first name.',
      returnKeyType: "next",
      onSubmitEditing: (event) => self.refs.form.getComponent('lastName').refs.input.focus()
    },
    lastName: {
      error: 'Please enter last name.',
      returnKeyType: "next",
      onSubmitEditing: (event) => self.refs.form.getComponent('email').refs.input.focus()
    },
    email: {
      error: 'Please enter email.',
      returnKeyType: "next",
      onSubmitEditing: (event) => self.refs.form.getComponent('password').refs.input.focus()
    },
    password: {
      password: true,
      secureTextEntry: true,
      error: 'Please enter password.',
      returnKeyType: "next",
      onSubmitEditing: (event) => self.refs.form.getComponent('confirmPassword').refs.input.focus()
    },
    confirmPassword: {
      password: true,
      secureTextEntry: true,
      error: 'Please enter confirm password.'
    }
  }
};

export default class SingUp extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    self = this;
    this.state = {
      value: null
    };
  }

  async componentWillMount() {
    const { navigate } = this.props.navigation
    let userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      navigate('Home');
    }
  }

  onChange(value) {
    this.setState({ value: value });
  }

  clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }

  onPress() {
    const { navigate } = this.props.navigation
    var value = this.refs.form.getValue();
    if (value) {
      let userDetails = {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password
      }
      LocalStorageUtils.set('userDetails', userDetails);
      this.clearForm();
      Keyboard.dismiss();
      navigate('Login');
      alert('Register successfully.');
    }
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <ImageBackground style={{ width: '100%', flex: 1, zIndex: -1, }} source={require('../public/images/wallpaper.png')}            >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.header}>SingUp</Text>
          <Form
            ref="form"
            type={User}
            options={options}
            value={this.state.value}
            onChange={this.onChange.bind(this)}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>SingUp</Text>
          </TouchableHighlight>
          <Text style={styles.link} onPress={() => navigate('SingIn')}>Alredy have accout?</Text>
        </KeyboardAvoidingView>
      </ImageBackground>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  link: {
    color: 'blue',
    borderBottomColor: 'blue',
    fontSize: 20,
    textAlign: 'center',
  },
  header: {
    color: '#000000',
    fontSize: 35,
    textAlign: 'center',
  }
});
