import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { useResizeGesture, useViewPanGesture } from "./hook";
import { PanGestureHandler } from "react-native-gesture-handler";
import { OverlayStyle, OverlayType } from "../../../../../types/editor";
import { ReduxState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../../../../components";
import { colors } from "../../../../../../theme";
import { utilsActions } from "../../../../store/slice/utils";

type IProps = {
  type: OverlayType;
  source: string;
  id: string;
};

const DragResize: React.FC<IProps> = ({ type, source, id }) => {
  const overlayStyle: OverlayStyle = useSelector(
    (s: ReduxState) => s.utils.overlayStyles[id]
  );
  const isActiveOverlay = useSelector(
    (s: ReduxState) => s.utils.activeOverlay === id
  );
  const dragGesture = useViewPanGesture(overlayStyle, id);
  const resizeGesture = useResizeGesture(
    overlayStyle.style,
    id,
    type === "text"
  );
  const dispatch = useDispatch();

  const onDeletePress = () => {
    dispatch(utilsActions.removeOverlay(id));
  };

  const onToggleActivePress = () => {
    if (!isActiveOverlay) {
      dispatch(utilsActions.toggleActiveOverlay(id));
    }
  };

  return (
    <Animated.View
      onTouchStart={onToggleActivePress}
      style={[
        getContainerStyle(overlayStyle.style, isActiveOverlay),
        dragGesture.style,
      ]}
    >
      <PanGestureHandler onGestureEvent={dragGesture.handler}>
        {type === "image" ? (
          <Animated.Image
            style={resizeGesture.overlayStyle}
            source={{
              uri: source,
            }}
            resizeMode={"stretch"}
          />
        ) : (
          <Animated.Text style={resizeGesture.overlayStyle}>
            {source}
          </Animated.Text>
        )}
      </PanGestureHandler>
      {isActiveOverlay ? (
        <React.Fragment>
          <Animated.View style={resizeGesture.iconStyle}>
            <PanGestureHandler onGestureEvent={resizeGesture.handler}>
              <Animated.View>
                <Icon style={styles.expand} size={12} name={"expand-alt"} />
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
          <TouchableOpacity
            onPress={onDeletePress}
            style={[styles.trashContainer]}
          >
            <Icon
              onPress={onDeletePress}
              size={12}
              color={colors.white}
              name={"trash-alt"}
            />
          </TouchableOpacity>
        </React.Fragment>
      ) : null}
    </Animated.View>
  );
};

export default DragResize;

const getContainerStyle = (
  { zIndex }: any,
  isActiveOverlay: boolean
): ViewStyle => {
  return {
    position: "absolute",
    borderWidth: isActiveOverlay ? 1 : 0,
    padding: isActiveOverlay ? 10 : 0,
    borderRadius: 4,
    zIndex,
  };
};

const styles = StyleSheet.create({
  expand: {
    transform: [{ rotate: "270deg" }],
  },
  expandContainer: {},
  trashContainer: {
    position: "absolute",
    top: -12,
    left: -12,
    backgroundColor: colors.red,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});
