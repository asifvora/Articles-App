'use strict';

import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import NavigationStack from "./navigationStack";
import Toast from 'react-native-simple-toast';
import { BackHandler } from "react-native";

class AppNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backPressTime: 0,
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            const { dispatch, navigation, navigationState } = this.props;
            let current_index_id = navigationState.routes["0"].routes["0"].index;
            let currentRouteName = navigationState.routes["0"].routes["0"].routes[current_index_id].routeName;
            console.log('current_index_id', current_index_id)
            console.log('currentRouteName', currentRouteName)
            //below commented line is original line from template
            //if (navigationState.routes.length === 1 && (navigationState.routes[0].routeName === 'Login' || navigationState.routes[0].routeName === 'Start')) {
            if (currentRouteName === 'SingIn' || currentRouteName === 'Home') {
                //this will check if previous backPressTime +10 sec is greater than current time then exit else set backPressTime to current time
                if ((this.state.backPressTime + 10) > Math.floor(Date.now() / 1000)) {
                    BackHandler.exitApp();
                    return false;
                } else {
                    Toast.show("Pressing Back one more time will close the application");
                    this.setState({
                        backPressTime: Math.floor(Date.now() / 1000)
                    });
                }
                return true
            } else if (navigationState.routes["0"].routes["0"].routes.length <= 2) {
                return false;
            } else {
                dispatch({ type: 'Navigation/BACK' });
                return true;
            }
        }.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    render() {
        const { navigationState, dispatch } = this.props;
        const navigation = addNavigationHelpers({ dispatch, state: navigationState, addListener: () => { } })
        console.log('navigation', navigation)
        return (
            <NavigationStack navigation={navigation} />
        );
    }
}

const mapStateToProps = state => {
    return {
        navigationState: state.navigationReducer
    };
};


export default connect(mapStateToProps)(AppNavigation);