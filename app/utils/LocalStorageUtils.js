import { AsyncStorage } from 'react-native';

export default {

  // async get(key) {
  //   // let value = await AsyncStorage.getItem(key);
  //   // console.log('get value', value);
  //   // return value;
  //   // return new Promise((resolve, reject) => {
  //   //   try {
  //   //     let value = await AsyncStorage.getItem(key);
  //   //     console.log('get value', value);
  //   //     resolve(value);
  //   //   } catch (error) {
  //   //     reject(error)
  //   //   }
  //   // })
  // },

  set(key, json) {
    const value = JSON.stringify(json);
    try {
      AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('caught error', error);
    }
  },

  merge: (key, json) => {

    const value = JSON.stringify(json);

    return AsyncStorage.mergeItem(key, value);

  },

  clear: (key) => {
    return AsyncStorage.removeItem(key);

  }

}