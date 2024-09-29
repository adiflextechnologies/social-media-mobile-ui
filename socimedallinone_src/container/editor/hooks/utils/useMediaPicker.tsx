import {
  useCameraPermissions,
  useMediaLibraryPermissions,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";

const useMediaPicker = () => {
  const [cameraStatus, cameraPermission] = useCameraPermissions();
  const [galleryStatus, galleryPermission] = useMediaLibraryPermissions();

  const useGallery = async (type: MediaTypeOptions) => {
    if (!galleryStatus?.granted) {
      const status = await galleryPermission();
      if (!status.granted) {
        return;
      }
    }
    return await launchImageLibraryAsync({
      mediaTypes: type,
      allowsEditing: true,
      quality: 1,
    });
  };

  const useCamera = async (type: MediaTypeOptions) => {
    if (!cameraStatus?.granted) {
      const status = await cameraPermission();
      if (!status.granted) {
        return;
      }
    }
    return await launchCameraAsync({
      mediaTypes: type,
      allowsEditing: true,
      quality: 1,
    });
  };

  return {
    useGallery,
    useCamera,
  };
};

export default useMediaPicker;
