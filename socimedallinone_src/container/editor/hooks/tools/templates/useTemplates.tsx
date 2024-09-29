import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {utilsActions} from '../../../store/slice/utils';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from '../../../store';

const useTemplates = () => {
  const dispatch = useDispatch<any>();
  const templates = useSelector((state: ReduxState) => state.utils.templates);
  const activeTemplate = useSelector(
    (state: ReduxState) => state.utils.activeTemplate,
  );

  const onTemplatePress = (item: any) => {
    dispatch(utilsActions.toogleTemplate(item));
  };

  return {
    templates,
    activeTemplate,
    onTemplatePress,
  };
};

export default useTemplates;

const styles = StyleSheet.create({});
