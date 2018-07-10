'use strict';

import React, { Component } from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { filterSearchData, fetchArticles } from '../actions/articles';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    searchArticlesData(text) {
        if (text) {
            this.props.filterSearchData(text);
        } else {
            this.props.fetchArticles();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    onChangeText={(text) => this.searchArticlesData(text)}
                />
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
    filterSearchData,
    fetchArticles
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
    container: {
        top: 0,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eff3f9',
    },
    input: {
        height: 40,
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
});