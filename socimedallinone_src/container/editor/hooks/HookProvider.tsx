import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFrames } from "../store/async/utils";
import { EditorProvider } from "./editor/useEditor";
import { useSession } from "../../../hook/useSession";

const HooksProvider: React.FC<any> = ({ children }) => {
  const { user: userData }: any = useSession();
  const dispatch = useDispatch<any>();

  const getInitial = () => {
    dispatch(getFrames(userData));
  };

  useEffect(() => {
    getInitial();
  }, []);

  return <EditorProvider>{children}</EditorProvider>;
};

export default HooksProvider;
