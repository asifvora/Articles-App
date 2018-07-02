
'use strict';

import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert, Image, AsyncStorage } from 'react-native';
import LocalStorageUtils from '../utils/LocalStorageUtils';

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetails: {}
        };
    }

    async componentWillMount() {
        let userDetails = await AsyncStorage.getItem('userDetails');
        if (userDetails) {
            this.setState({ userDetails: JSON.parse(userDetails) })
        }
    }

    logoutConfirmation() {
        Alert.alert(
            'Confirmation',
            'Are you sure want to logout?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.userLogout() },
            ],
            { cancelable: false }
        )
    }

    userLogout() {
        const { navigate } = this.props.navigation;
        let userLogoutKEy = LocalStorageUtils.clear('userToken');
        navigate('SingIn');
    }

    gotoPage(param) {
        const { navigation, navigationState } = this.props;
        let current_index_id = navigationState.routes["0"].routes["0"].index;
        let currentRouteName = navigationState.routes["0"].routes["0"].routes[current_index_id].routeName;
        if (param !== currentRouteName) {
            this.props.navigation.navigate(param)
        } else {
            navigation.navigate('DrawerClose');
        }
    }

    render() {
        let full_name = 'Full name';
        if (this.state.userDetails) {
            full_name = this.state.userDetails.firstName + " " + this.state.userDetails.lastName;
        }
        return (
            <View style={Style.container}>
                <View style={[Style.sideMenuHeaderBox, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                        <Image
                            style={Style.sideMenuProfileImage}
                            resizeMode='cover'
                            source={require('../public/images/profile_icon.png')}
                        />
                    </View>
                    <View style={{ alignItems: 'flex-start', justifyContent: 'center', flex: 2 }}>
                        <Text style={Style.sideMenuFullNameText}>
                            {full_name}
                        </Text>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => this.gotoPage('Home')}>
                    <View style={[Style.sideMenuBox, { flexDirection: 'row' }]}>
                        <View style={{ justifyContent: 'center'}}>
                            <Image
                                style={Style.sideMenuImage}
                                resizeMode='cover'
                                source={require('../public/images/home.png')}
                            />
                        </View>
                        <View style={{ alignItems: 'flex-start', justifyContent: 'center', flex: 2 }}>
                            <Text style={Style.sideMenuBoxText}>Home</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.logoutConfirmation()}>
                    <View style={[Style.sideMenuBox, { flexDirection: 'row' }]}>
                        <View style={{ justifyContent: 'center'}}>
                            <Image
                                style={Style.sideMenuImage}
                                resizeMode='cover'
                                source={require('../public/images/logout.png')}
                            />
                        </View>
                        <View style={{ alignItems: 'flex-start', justifyContent: 'center', flex: 2 }}>
                            <Text style={Style.sideMenuBoxText} >Logout</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        navigationState: state.navigationReducer,
    };
};

export default connect(mapStateToProps)(SideBar);

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sideMenuBox: {
        marginLeft: 10,
        height: 60,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#3543ad',
    },
    sideMenuBoxText: {
        color: "#3543ad",
        fontSize: 20,
        marginLeft: 10
    },
    sideMenuHeaderBox: {
        padding: 5,
        width: '100%',
        backgroundColor: '#3543ad',
        borderBottomWidth: 1,
        borderColor: '#fff',
        height: 75,
    },
    sideMenuProfileImage: {
        width: 55,
        height: 55,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        marginRight: 10,
    },
    sideMenuFullNameText: {
        fontSize: 20,
        color: '#fff',
    },
    sideMenuImage: {
        width: 40,
        height: 40,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFFFFF',
    },
});