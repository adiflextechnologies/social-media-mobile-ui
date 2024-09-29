import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppHeader, Carousel, Container, Space} from '../../components';
import {LabelList} from './components';
import {useNavigation} from '@react-navigation/native';
import useDashboard from '../../hook/useDashboard';
import STATIC_VIDEO from '../../static';
import api from '../../service';

const Home = () => {
  const {posters, data, category, isLoading} = useDashboard();
  const navigation = useNavigation();

  const onMorePress = prop => {
    navigation.push('Details', prop);
  };

  useEffect(async () => {
    // const result = await api.home.getReels();
  }, []);

  const onVideoPress = prop => {
    // navigation.push("Details", prop);
  };

  const renderItem = ({item, index}) => {
    return (
      <LabelList
        label={item.name}
        data={item}
        extraIndex={index}
        onMorePress={onMorePress}
      />
    );
  };

  return (
    <Container isLoading={isLoading} style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.genre_id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Carousel posters={posters} />}
      />
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});
