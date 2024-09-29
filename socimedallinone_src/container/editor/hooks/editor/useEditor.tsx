import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {editorActions} from '../../store/slice/editor';
import utils, {utilsActions} from '../../store/slice/utils';
import {STATIC_FORMATS} from '../../utils/constants/formats';
import {useFileSystem} from '../utils';
import {useSetEditorType} from '../../store/recoil/utils';

type EditorProps = {};

const EditorContext = React.createContext<EditorProps>({} as any);

const EditorProvider: PropsWithChildren<any> = ({children}: any) => {
  const params = useRoute<any>().params;
  const dispatch = useDispatch<any>();
  const [isLoading, setLoading] = useState(true);
  const {setVideoEditorType} = useSetEditorType();
  const {getDownloadedUri, getLocalUri, getExtension} = useFileSystem();
  console.log('video_file => ', params);

  const getInitial = async () => {
    if (params.isVideoEditor) {
      const localUri = await getDownloadedUri(
        params.data.video_file,
        getLocalUri(
          `SMAIO_${new Date().toISOString()}.${getExtension(
            params.data.video_file,
          )}`,
        ),
      );
      dispatch(editorActions.setVideoSource(localUri));
    } else {
      dispatch(
        editorActions.setImageSource({
          data: params.data.images.map(
            (item: any) => item.image_url || item.poster_url,
          ),
          index: params.data.index,
          initialIndex: params.data.index,
        }),
      );
    }
    // dispatch(editorActions.setVideoEditorType(params.isVideoEditor));
    setVideoEditorType(params.isVideoEditor);
    dispatch(utilsActions.setActiveFormat(STATIC_FORMATS[2]));
    setLoading(false);
  };

  useEffect(() => {
    getInitial();
  }, [params]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <EditorContext.Provider value={{}}>{children}</EditorContext.Provider>;
};

const useEditor = () => useContext(EditorContext);

export default useEditor;

export {EditorProvider};
