import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../../service';
import {Image} from 'expo-image';
import {LoadingContent, LoginPopup, NoData} from '../../../components';
import {colors} from '../../../theme';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {useSession} from '../../../hook/useSession';

const {width: WIDTH} = Dimensions.get('window');

const PostersReels = () => {
  const params = useRoute<any>().params;
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (params.isReels) {
      getReels();
    } else {
      getPosters();
    }
  }, []);

  const getReels = async () => {
    const {data, status} = await api.home.getReelsByCatId(params.id);
    setData(data.data);
    setLoading(false);
  };

  const getPosters = async () => {
    const {data, status} = await api.home.getDetailsByImgId(params.id);
    setData(data.season[0].episodes);
    setLoading(false);
  };

  const renderItem = ({item, index}: any) => {
    return (
      <Item isReels={params.isReels} index={index} item={item} data={data} />
    );
  };

  if (isLoading) {
    return <LoadingContent />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        ListEmptyComponent={<NoData label="No Reels Found" />}
        keyExtractor={item => item.thumbnail || item.episodes_id}
        renderItem={renderItem}
      />
    </View>
  );
};

type IProps = {
  isReels: boolean;
  item: any;
  data: any;
  index: number;
};

const Item: React.FC<IProps> = ({isReels, data, item, index}) => {
  const [isFailed, setFailed] = useState(false);
  const [isLoginPopup, setLoginPopup] = useState(false);
  const {isAuth}: any = useSession();
  const navigation = useNavigation<any>();
  const source = useMemo(() => {
    return {
      uri: isReels ? item.thumbnail : item.image_url || item.thumbnail_url,
    };
  }, [item]);

  const onError = () => {
    setFailed(true);
  };

  const onLoginPopupClose = () => {
    setLoginPopup(false);
  };

  const onPress = () => {
    if (!isAuth) {
      setLoginPopup(true);
      return;
    }
    navigation.push('Editor', {
      data: isReels
        ? item
        : {
            index: index,
            images: data,
          },
      isImgById: true,
      label: '',
      isVideoEditor: isReels,
    });
  };

  return (
    <View style={styles.imageContainer}>
      <Pressable onPress={onPress}>
        <Image style={styles.image} source={source} onError={onError} />
      </Pressable>
      {isFailed ? (
        <View style={styles.playIconContainer}>
          <Icon
            name="play-box-multiple-outline"
            size={50}
            onPress={onPress}
            color={colors.white}
          />
        </View>
      ) : null}
      {isLoginPopup ? (
        <LoginPopup isVisible={isLoginPopup} onClose={onLoginPopupClose} />
      ) : null}
    </View>
  );
};

export default PostersReels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 5,
  },
  imageContainer: {
    // marginRight: 10,
    marginVertical: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: WIDTH / 2.2,
    height: 180,
    borderRadius: 5,
    backgroundColor: colors.accent,
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  playIconContainer: {
    position: 'absolute',
  },
});
