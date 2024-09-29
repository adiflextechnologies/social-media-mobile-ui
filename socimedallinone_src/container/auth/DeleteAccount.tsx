import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppHeader, Button, Container} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useSession} from '../../hook/useSession';
import {colors} from '../../theme';
import api from '../../service';

const DELETE = 'Thank You';

const DeleteAccount = () => {
  const navigation = useNavigation<any>();
  const {user, isAuth, logoutUser, setGuestMode}: any = useSession();
  const [isContinue, setContinue] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onContinuePress = () => {
    setContinue(true);
  };

  const onTimerDone = async () => {
    setContinue(false);
    setLoading(true);
    const params = {
      user_id: user.user_id || user.userid,
    };

    const result = await api.auth.deleteProfile(params);
    logoutUser();
  };

  const renderHeader = () => {
    return (
      <AppHeader navigation={navigation} isBack title={'Delete Account'} />
    );
  };

  return (
    <Container msg={DELETE} isLoading={isLoading} renderHeader={renderHeader}>
      <View style={styles.container}>
        <Text style={styles.name}>Hi {user.name}</Text>
        <Text style={styles.desc}>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Text>
        {isContinue ? <Timer onTimerDone={onTimerDone} /> : null}
      </View>
      <Button
        title="Continue"
        isLoading={isContinue}
        onPress={onContinuePress}
      />
      <Button
        title="Cancel"
        isOutlined
        containerStyle={styles.cancel}
        onPress={navigation.goBack}
      />
    </Container>
  );
};

type TimerProps = {
  onTimerDone: () => void;
};

let intervalTimer: any;

const Timer: React.FC<TimerProps> = ({onTimerDone}) => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    intervalTimer = setInterval(() => {
      setTime(t => t - 1);
    }, 1000);

    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      onTimerDone();
    }
  }, [time]);

  return (
    <View>
      <Text style={styles.time}>Deleting in {time}</Text>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    color: '#fff',
  },
  desc: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  cancel: {
    marginVertical: 20,
  },
  time: {
    fontSize: 18,
    color: colors.active,
  },
});
