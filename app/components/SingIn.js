'use strict';

import React, { Component } from 'react';
import { connect } from "react-redux";
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, AsyncStorage, Keyboard, ImageBackground } from 'react-native';
import { NavigationActions } from 'react-navigation';
import t from 'tcomb-form-native';
import LocalStorageUtils from '../utils/LocalStorageUtils';
import TokenGenerate from '../utils/TokenGenerate';

let userDeta = {};
var self;
const Form = t.form.Form;
const validate = t.validate;
const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});

const User = t.struct({
    email: Email,
    password: t.String
});

validate(null, User).isValid();
const options = {
    auto: 'placeholders',
    fields: {
        email: {
            error: 'Please enter email.',
            returnKeyType: "next",
            onSubmitEditing: (event) => self.refs.form.getComponent('password').refs.input.focus()
        },
        password: {
            password: true,
            secureTextEntry: true,
            error: 'Please enter password.'
        }
    }
};

class SingIn extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        self = this;
        this.state = {};
    }

    async componentWillMount() {
        const { navigate } = this.props.navigation
        let userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
            navigate('Home');
        }
    }

    async onPress() {
        const { navigate } = this.props.navigation
        var value = this.refs.form.getValue();
        if (value) {
            console.log('value', value)
            let email = value.email;
            let password = value.password;
            console.log('email', email)
            console.log('password', password)
            let userDetails = await AsyncStorage.getItem('userDetails');
            userDetails = JSON.parse(userDetails);
            userDeta = userDetails;
            console.log('userDeta', userDeta)
            console.log('userDetails Parse', userDetails)
            let userEmail = userDetails.email;
            let userPassword = userDetails.password;
            console.log('userEmail', userEmail)
            console.log('userPassword', userPassword)
            if (email === userEmail && password === userPassword) {
                let token = TokenGenerate.encode(email);
                LocalStorageUtils.set('userToken', token);
                console.log('token', token)
                alert('Successfully login.');
                Keyboard.dismiss();
                navigate('Home');
            } else {
                alert('Invalid email or password.')
            }
        }
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <ImageBackground style={{ width: '100%', flex: 1, zIndex: -1, }} source={require('../public/images/wallpaper.png')}            >
                <View style={styles.container}>
                    <Text style={styles.header}>SingIn</Text>
                    <Form
                        ref="form"
                        type={User}
                        options={options}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>SingIn</Text>
                    </TouchableHighlight>
                    <Text style={styles.link} onPress={() => navigate('SingUp')}>Create accout.</Text>
                </View >
            </ImageBackground>
        );
    }
}

export default SingIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingTop: 90
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
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
