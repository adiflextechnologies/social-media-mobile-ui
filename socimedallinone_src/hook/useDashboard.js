import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from '../service/api';

const useDashboard = () => {
  const [isLoading, setLoading] = useState(false);
  const [posters, setPosters] = useState([]);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);

  const getData = async () => {
    setLoading(true);
    const {data} = await api.home.getDashboard();
    setPosters(data.slider.slide);
    const genreData = data.features_genre_and_movie;

    // const category = data.all_genre.map((item) => ({
    // 	...item,
    // 	data: genreData.find((genre) => genre.genre_id === item.genre_id)
    // }));

    // setCategory(category.reverse());
    setData(data.features_genre_and_movie);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return {
    isLoading,
    posters,
    category,
    data,
    refetch: getData,
  };
};

export default useDashboard;
