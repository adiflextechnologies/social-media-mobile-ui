import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppHeader, Container, Wrapper} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../service/api';
import {colors} from '../../theme';
import {Image} from 'expo-image';

const Details = () => {
  const {data, label, extraIndex, isImgById} = useRoute().params;
  const [details, setDetails] = useState([]);
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    setLoading(true);
    if (isImgById) {
      const respdata = await api.home.getDetailsByImgId(data.videos_id);
      api.home.getReelsByCatId(data.videos_id);

      // console.log('Resp => ', respdata.data.season[0].episodes);
      setDetails(respdata.data.season[0].episodes);
    } else {
      const respdata = await api.home.getDetailsByCatId(data.genre_id);
      setDetails(respdata.data);
    }
    setLoading(false);
  };

  const renderItem = ({item, index}) => {
    // console.log('Testing');
    const imgUri = item.image_url ? item.image_url : item.thumbnail_url;

    console.log('===> ', item);

    return (
      <View style={styles.cardContainer}>
        <Wrapper
          isDetails={true}
          label={item.title}
          data={{
            index: index,
            images: details,
          }}>
          <Image
            style={{
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
              height: 200,
              width: width / 2.4,
            }}
            resizeMode="stretch"
            source={{uri: imgUri}}
          />
        </Wrapper>
        <Text
          style={{
            paddingVertical: 5,
            paddingStart: 5,
            color: colors.white,
          }}
          numberOfLines={1}>
          {getDetailsText(item.title)}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      title: label,
    });
  }, [label]);

  const renderHeader = () => {
    return <AppHeader title={label} navigation={navigation} isBack />;
  };

  return (
    <Container
      renderHeader={renderHeader}
      isLoading={isLoading}
      style={{
        paddingTop: 10,
        width: '100%',
      }}>
      <FlatList
        data={details}
        // keyExtractor={item => item.id}
        numColumns={2}
        // contentContainerStyle={{
        //   paddingHorizontal: 5,
        //   alignSelf: 'stretch',
        // }}
        ListFooterComponent={<View style={{height: 100}} />}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </Container>
  );
};

const getDetailsText = (textStr = '') => {
  return textStr.length < 25 ? `${textStr}` : `${textStr.substring(0, 25)}...`;
};

export default Details;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  cardContainer: {
    marginRight: 10,
    marginVertical: 5,
    borderRadius: 5,
    // backgroundColor: 'red',
  },
  //   title: {
  //     fontSize: 12,
  //     paddingHorizontal: 10,
  //     paddingVertical: 10,
  //   },
});
