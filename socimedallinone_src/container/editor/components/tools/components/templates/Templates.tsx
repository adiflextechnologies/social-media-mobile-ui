import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Image} from 'expo-image';
import ToolTitle from '../common/title/ToolTitle';
import {colors} from '../../../../../../theme';
import {useTemplates} from '../../../../hooks';

const Templates = () => {
  const {activeTemplate, onTemplatePress, templates} = useTemplates();

  const renderItem = ({item}: any) => {
    let activeStyle: ViewStyle = {};
    if (activeTemplate?.id === item.id) {
      activeStyle.borderColor = colors.active;
    }
    return (
      <TouchableOpacity
        onPress={() => onTemplatePress(item)}
        style={[styles.imageContainer, activeStyle]}>
        <Image source={{uri: item.images}} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <ToolTitle>Templates</ToolTitle> */}
      <FlatList
        data={templates}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Templates;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  imageContainer: {
    marginHorizontal: 5,
    padding: 4,
    backgroundColor: colors.secoundry,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: colors.primary,
  },
});
