import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TickerText, Wrapper} from '../../../components';
import {colors} from '../../../theme';
import {Image} from 'expo-image';

// type IProps = {
//   data: any[];
//   label: string;
//   extraIndex?: number;
//   onMorePress: (props: any) => void
// };

const LabelList = ({
  data,
  label,
  extraIndex,
  onMorePress,
  isStatic,
  isMore = true,
}) => {
  const onMore = () => {
    onMorePress({data, label, extraIndex});
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.cardContainer}>
        <Wrapper
          isDetails={!item.is_video}
          data={item}
          label={label}
          isVideo={item.is_video}
          // imgUri={item.thumbnail_url}
        >
          <Image
            style={{
              borderRadius: 5,
              height: 120,
              elevation: 4,
            }}
            resizeMode={'contain'}
            source={{
              uri: item.thumbnail_url,
            }}
          />
        </Wrapper>
        <TickerText numberOfLines={1} style={styles.title}>
          {item.title}
        </TickerText>
      </View>
    );
  };

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>{label}</Text>
        {isMore ? (
          <TouchableOpacity
            style={{
              backgroundColor: colors.active,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}
            onPress={onMore}>
            <Text
              style={{
                color: '#fff',
              }}>
              More...
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <FlatList
        data={data?.videos || []}
        keyExtractor={item => item.videos_id}
        horizontal
        renderItem={renderItem}
      />
    </View>
  );
};

export default LabelList;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  label: {
    fontSize: 18,
    color: colors.white,
    opacity: 0.8,
    // fontWeight: '500'
    // fontWeight: '500',
    // paddingBottom: 10,
  },
  container: {
    paddingTop: 12,
  },
  cardContainer: {
    marginRight: 10,
    width: 120,
    // height: 200,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: colors.white,
    opacity: 0.8,
  },
});
