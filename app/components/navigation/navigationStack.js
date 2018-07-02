'use strict';

import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Home from '../Home';
import About from '../About';
import SingUp from '../SingUp';
import SingIn from '../SingIn';
import SideBar from '../SideBar';

const navigator = StackNavigator({
    SingIn: { screen: SingIn },
    Home: { screen: Home },
    About: { screen: About },
    SingUp: { screen: SingUp }
}, {
        headerMode: 'screen'
    });

const Drawer = DrawerNavigator({
    home: {
        screen: navigator,
    }
},
    {
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        contentOptions: {
            activeTintColor: '#e91e63',
        },
        drawerBackgroundColor: '#1f1f1f',
        contentComponent: props => <SideBar {...props} />
    });

export default Drawer;



