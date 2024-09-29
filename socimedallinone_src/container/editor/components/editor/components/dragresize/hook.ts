import {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { OverlayStyle } from "../../../../../types/editor";
import { useDispatch } from "react-redux";
import { colors } from "../../../../../../theme";
import { utilsActions } from "../../../../store/slice/utils";

const useViewPanGesture = ({ position }: OverlayStyle, id: string) => {
  const dispatch = useDispatch<any>();
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  const onEnd = () => {
    dispatch(
      utilsActions.updateOverlayStyle({
        id: id,
        data: {
          position: {
            x: translateX.value,
            y: translateY.value,
          },
        },
      })
    );
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (e, ctx) => {
      // dispatch
      runOnJS(onEnd)();
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return {
    handler: onGestureEvent,
    style,
  };
};

const useResizeGesture = (
  { width: initialWidth, height: initialHeight }: OverlayStyle["style"],
  id: string,
  isText: boolean
) => {
  const dispatch = useDispatch<any>();
  const width = useSharedValue<number>(initialWidth);
  const height = useSharedValue<number>(initialHeight);

  const onEnd = () => {
    dispatch(
      utilsActions.updateOverlayStyle({
        id: id,
        data: {
          style: {
            width: width.value,
            height: height.value,
          },
        },
      })
    );
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startWidth = width.value;
      ctx.startHeight = height.value;
    },
    onActive: (event, ctx) => {
      width.value = ctx.startWidth + event.translationX;
      height.value = ctx.startHeight + event.translationY;
    },
    onEnd: () => {
      runOnJS(onEnd)();
    },
  });

  const overlayStyle = useAnimatedStyle(() => {
    if (isText) {
      return {
        fontSize: height.value,
      };
    }
    return {
      width: width.value,
      height: height.value,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      bottom: -12,
      right: -12,
      backgroundColor: colors.active,
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
    };
  });

  return {
    handler: onGestureEvent,
    overlayStyle,
    iconStyle,
  };
};

export default useResizeGesture;

export { useViewPanGesture, useResizeGesture };
