'use strict';

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, Button, Text, View, Linking, AsyncStorage } from 'react-native';

class About extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.data.title}`,
      headerStyle: {
        backgroundColor: '#3543ad',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    };
  };

  async componentWillMount() {
    console.log('componentWillMount About page')
    const { navigate } = this.props.navigation
    let userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      navigate('SingIn');
    }
  }

  render() {
    const { state, navigate } = this.props.navigation;
    const data = state.params.data;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
            {data.urlToImage ? <Image style={styles.image}  source={{ uri: data.urlToImage }} /> : <Image source={require('../public/images/default-articles-img.png')} style={styles.image} />}
            <Text style={styles.welcome}>
              {data.title}
            </Text>
            <Text style={styles.text}>
              {data.description}
            </Text>
            <Text style={styles.link} onPress={() => { Linking.openURL(data.url) }}>
              {'Visit Here'}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontStyle: 'italic'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  image: {
    maxWidth: '100%',
    height: 250
  },
  link: {
    color: 'blue',
    borderBottomColor: 'blue',
    fontSize: 20,
    textAlign: 'center',
  }
});
