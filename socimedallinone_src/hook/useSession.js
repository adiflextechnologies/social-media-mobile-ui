import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {actions, local} from '../store';
import {useDispatch} from 'react-redux';
import {Image} from 'expo-image';

const SessionContext = React.createContext({});

const SessionProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [isAuth, setAuth] = useState(false);
  const [isGuestMode, setGuestMode] = useState(true);
  const {height} = useWindowDimensions();

  const logoutUser = async () => {
    await local.pop(local.keys.SESSION);
    setAuth(false);
    setGuestMode(false);
    setUser({});
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        setUser,
        setAuth,
        isAuth,
        logoutUser,
        setGuestMode,
        isGuestMode,
      }}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext);

export {useSession, SessionProvider};

const styles = StyleSheet.create({});
