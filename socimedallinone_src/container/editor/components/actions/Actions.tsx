import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Icon} from '../../../../components';
import {colors} from '../../../../theme';
import {useDispatch, useSelector} from 'react-redux';
// import { editorActions } from "../../store/slice/editor";
import {ReduxState} from '../../store';
import {utilsActions} from '../../store/slice/utils';
import {useEditorType} from '../../store/recoil/utils';

const Actions: React.FC<any> = () => {
  const tool = useSelector((state: ReduxState) => state.utils.tool);
  const {isVideoEditor} = useEditorType();

  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {isVideoEditor ? (
          <ActionItem
            isSelected={tool === timeline.label}
            key={timeline.label}
            item={timeline}
          />
        ) : null}
        {actions.map(item => {
          return (
            <ActionItem
              isSelected={tool === item.label}
              key={item.label}
              item={item}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

type ItemProps = {
  item: {
    icon: string;
    label: string;
  };
  isSelected: boolean;
};

const ActionItem: React.FC<ItemProps> = ({item, isSelected}) => {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(utilsActions.setActiveTool(item.label));
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer, !isSelected && styles.shadow]}>
      <Icon
        name={item.icon}
        onPress={onPress}
        family="Ionicons"
        size={22}
        style={{}}
      />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const timeline = {
  icon: 'options-outline',
  label: 'Timeline',
};

const actions = [
  {
    icon: 'images-outline',
    label: 'Templates',
  },
  {
    icon: 'layers-outline',
    label: 'Overlay',
  },
  {
    icon: 'text-outline',
    label: 'Text',
  },
  {
    icon: 'expand-outline',
    label: 'Format',
  },
  {
    icon: 'cut-outline',
    label: 'Precut',
  },
  {
    icon: 'person-outline',
    label: 'User',
  },
  {
    icon: 'shapes-outline',
    label: 'Stickers',
  },
];

export default Actions;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 10,
    height: 80,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    width: 70,
    backgroundColor: colors.accent,
    marginEnd: 10,
    borderRadius: 5,
  },
  shadow: {
    backgroundColor: colors.secoundry,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  label: {
    color: colors.white,
    paddingTop: 4,
    fontSize: 12,
  },
});
