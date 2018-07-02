'use strict';

import React, { Component } from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchMoreArticles } from '../actions/articles';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    loadMore() {
        this.setState({ isLoading: true });
        this.props.fetchMoreArticles();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoading: nextProps.isLoading
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator animating size="small" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => this.loadMore()}>
                    <Text style={styles.text}>Load More</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        isLoading: state.articlesReducer.isLoading,
        data: state.articlesReducer.data
    }
}

const mapDispatchToProps = {
    fetchMoreArticles
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderColor: '#8E8E8E',
        borderWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    text: {
        color: '#8E8E8E',
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderColor: "#CED0CE",
        padding: 8,
    },
});
