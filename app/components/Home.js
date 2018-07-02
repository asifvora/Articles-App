'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, AsyncStorage, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/articles';
import LocalStorageUtils from '../utils/LocalStorageUtils';
import Row from './Row';
import Header from './Header';
import Footer from './Footer';
import styles from '../public/styles/homeStyle';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            responseDataStatus: null,
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
            headerStyle: {
                backgroundColor: '#3543ad',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: (
                <TouchableWithoutFeedback title="Menu" onPress={() => navigation.navigate('DrawerOpen')} >
                    <Image source={require('../public/images/menu.png')} style={{ height: 25, width: 30, marginLeft: 10 }} />
                </TouchableWithoutFeedback>
            )
        };
    };

    async componentWillMount() {
        const { navigate } = this.props.navigation;
        let userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
            navigate('SingIn');
        }
    }

    async componentDidMount() {
        this.props.fetchArticles();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.success === true) {
            this.setState({
                isLoading: nextProps.isLoading,
                responseDataStatus: nextProps.data.success,
                dataSource: ds.cloneWithRows(nextProps.data.data)
            });
        } else {
            this.setState({
                isLoading: nextProps.isLoading,
                responseDataStatus: nextProps.data.success,
            });
        }
    }

    listData(data) {
        const { navigate } = this.props.navigation;
        return (
            <Row data={data} navigate={navigate} />
        );
    }

    render() {
        return (
            <View style={{ width: '100%', flex: 1 }}>
                <Header />
                {this.state.isLoading === true && <View style={styles.loading}><ActivityIndicator animating size="large" /></View>}
                {this.state.responseDataStatus === true && <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => this.listData(data)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    renderFooter={() => <Footer />}
                />}
                {this.state.responseDataStatus === false && <View><Text style={styles.noDataText}>{'No data available.'} </Text></View>}
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.articlesReducer.isLoading,
        data: state.articlesReducer.data
    }
}

const mapDispatchToProps = {
    fetchArticles
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

