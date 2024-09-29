import React from "react";
import { PhotoProvider } from "../../../hooks";
import { PhotoList } from "../../../lib";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../store";
import { Frame } from "./components";
import DragResize from "../components/dragresize/DragResize";

const ImageEditor = () => {
  return (
    <PhotoProvider>
      <PhotoList>
        <Frame />
        <Overlays />
      </PhotoList>
    </PhotoProvider>
  );
};

const Overlays = () => {
  const overlays = useSelector((s: ReduxState) => s.utils.overlays);
  return overlays.map(({ id, source, type }) => {
    return React.createElement(DragResize, {
      key: id,
      id,
      source,
      type,
    });
  });
};

export default ImageEditor;
