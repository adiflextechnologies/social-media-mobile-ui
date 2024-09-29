import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LottieIcon} from '../../../../../../components';
import {useDownload} from '../../../../hooks';
import {useDownloadState} from '../../../../store/recoil/utils';

const UnvisibleDownload = () => {
  useDownload();

  return null;
};

const Download = () => {
  const [isDownloading, setDownloading] = useDownloadState();

  const onDownloadPress = () => {
    setDownloading(c => !c);
    // if (!isDownloading) {
    //   startDownload(onDownloadDone);
    // }
    // setDownloading(true);
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.container}
        onPress={onDownloadPress}
        disabled={isDownloading}>
        {isDownloading ? (
          <Text style={styles.downloading}>Downloading...</Text>
        ) : null}
        <LottieIcon loop={isDownloading} name={'Download'} size={24} />
      </TouchableOpacity>
      <UnvisibleDownload />
    </React.Fragment>
  );
};

export default Download;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  downloading: {
    color: 'white',
    marginEnd: 10,
  },
});
