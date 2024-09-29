import AsyncStorage from '@react-native-async-storage/async-storage';

const push = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }


  const pull = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  const pop = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      // remove error
    }
  
  }

  const keys = {
    SESSION: "USER_SESSION"
  }
  

  const local = {
    push,
    pull,
    pop,
    keys
  }

  export default local