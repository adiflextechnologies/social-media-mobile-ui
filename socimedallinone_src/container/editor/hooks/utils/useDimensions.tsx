import {
  ImageStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {ReduxState} from '../../store';
import {colors} from '../../../../theme';

type ReturnType = {
  width: number;
  style: any;
  // imageStyle: ImageStyle;
};

const useDimensions = (): ReturnType => {
  const tool = useSelector((state: ReduxState) => state.utils.tool);
  const format = useSelector((state: ReduxState) => state.utils.format);
  const {width, height} = useWindowDimensions();
  const actualWidth = useMemo(() => {
    console.log('++++> ', width, height, format);
    return tool ? width - format.margin : width - format.padding;
  }, [tool, format, width]);
  const commonStyle = useMemo(() => {
    const ratio = width > 700 ? 1 : format.width / format.height;
    return getStyle(actualWidth, ratio);
  }, [actualWidth, format]);

  return {
    width: actualWidth,
    style: commonStyle,
    // imageStyle: {
    //   ...commonStyle,
    //   resizeMode: "stretch",
    // },
  };
};

export default useDimensions;

const getStyle = (width: number, ratio: number) => {
  return {
    height: (width - 30) / ratio,
    width: width - 30,
    borderRadius: 2,
    backgroundColor: colors.primary,
  };
};
