import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../store";

type PhotoProps = {
  data: string[];
  initialIndex: number;
};

const PhotoContext = React.createContext<PhotoProps>({} as any);

const PhotoProvider: React.FC<any> = ({ children }) => {
  const { data, initialIndex } = useSelector(
    (state: ReduxState) => state.editor.imageSource
  );
  return (
    <PhotoContext.Provider
      value={{
        data,
        initialIndex,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhoto = () => useContext(PhotoContext);

export default PhotoProvider;

const styles = StyleSheet.create({});
