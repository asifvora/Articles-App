'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class Row extends Component {
    render() {
        const data = this.props.data;
        const navigate = this.props.navigate;

        return (
            <View style={styles.container}>
                {data.urlToImage ? <Image source={{ uri: data.urlToImage }} style={styles.photo} /> : <Image source={require('../public/images/default-articles-img.png')} style={styles.photo} />}
                <TouchableOpacity onPress={() => navigate('About', { data: data })}>
                    <View>
                        <Text style={styles.text} >
                            {`${data.title}`}
                        </Text>
                    </View >
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        fontSize: 16,
        textAlign: 'justify',
        margin: 20,
    },
    photo: {
        height: 60,
        width: 60,
        borderRadius: 2,
    },
});