import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboard = () => {
  const [height, setHeight] = useState(0);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setHeight(e.endCoordinates.height);
        setOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setHeight(0);
        setOpen(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return {
    height,
    isOpen
  };
};

export default useKeyboard;
