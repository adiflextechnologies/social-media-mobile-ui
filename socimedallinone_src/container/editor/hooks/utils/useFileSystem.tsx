import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import {Image} from 'react-native';

const useFileSystem = () => {
  const dir = `${FileSystem.documentDirectory}/socialmedia/utils`;

  const getDownloadedUri = async (uri: string, localUri: string) => {
    // Extract the directory path from the localUri
    const directory = localUri.substring(0, localUri.lastIndexOf('/'));

    // Check if the directory exists, if not, create it
    const dirInfo = await FileSystem.getInfoAsync(directory);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(directory, {intermediates: true});
    }
    const result = await FileSystem.downloadAsync(uri, localUri);
    return result.uri;
  };

  const getLocalUri = (name: string) => {
    return `${dir}/${name}`;
  };

  const saveToGallery = async (uri: string) => {
    const {status} = await MediaLibrary.requestPermissionsAsync();

    if (status === 'granted') {
      try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('SMAIO', asset, false);
        console.log('Image saved to gallery!');
      } catch (error) {
        console.error('Error saving image to gallery:', error);
      }
    } else {
      console.error('Media library permissions not granted');
    }
  };

  const getImageSize = async (imageUri: string) => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        imageUri,
        (w, h) => {
          resolve({width: w, height: h});
        },
        error => {
          reject(error);
        },
      );
    });
  };

  const getExtension = (uri: string) => {
    const result = uri.split('.');
    return result[result.length - 1];
  };

  const main = async () => {
    const dirExists = await FileSystem.getInfoAsync(dir).then(
      info => info.exists,
    );
    if (!dirExists) {
      await FileSystem.makeDirectoryAsync(dir, {intermediates: true});
    }
  };

  main();

  return {
    getLocalUri,
    getDownloadedUri,
    saveToGallery,
    getImageSize,
    getExtension,
  };
};

export default useFileSystem;
