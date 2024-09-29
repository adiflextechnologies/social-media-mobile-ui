import {StyleSheet, Text, View} from 'react-native';
import {
  useCameraPermissions,
  useMediaLibraryPermissions,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';
import {useMediaPicker} from '../../utils';
import {useDispatch} from 'react-redux';
import {Overlay, OverlayType} from '../../../../types/editor';
import {utilsActions} from '../../../store/slice/utils';

const useAddOverlay = () => {
  const {useCamera, useGallery} = useMediaPicker();
  const dispatch = useDispatch<any>();

  const getMedia = async (type: MediaTypeOptions, isCamera: boolean) => {
    const result = isCamera ? await useCamera(type) : await useGallery(type);
    if (result?.assets) {
      addOverlay(result.assets[0].uri, 'image');
    }
  };

  const addOverlay = (source: string, type: OverlayType) => {
    const overlay: Overlay = {
      id: new Date().toISOString(),
      source: source,
      type: type,
    };
    dispatch(utilsActions.addOverlay(overlay));
  };

  return {
    getMedia,
    addOverlay,
  };
};

export default useAddOverlay;

const styles = StyleSheet.create({});
