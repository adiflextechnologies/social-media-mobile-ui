import {Asset} from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';

const downloadVideo = async (remoteUri: string) => {
  const videoDir = `${FileSystem.documentDirectory}static/video/`;
  const localUri = `${videoDir}StaticVideo.mp4`;

  const downloadResumable = FileSystem.createDownloadResumable(
    remoteUri,
    localUri,
  );

  const dirExists = await FileSystem.getInfoAsync(videoDir).then(
    info => info.exists,
  );
  if (!dirExists) {
    await FileSystem.makeDirectoryAsync(videoDir, {intermediates: true});
  }

  const result = await downloadResumable.downloadAsync();

  return result?.uri || '';
};

const generateFrames = async (duration: number, videoPath: string) => {
  // Get the video path after copying it to the file system
  // const videoPath = await downloadVideo(remoteUri);

  // Define the frame directory and pattern for output frames
  const frameDir = `${FileSystem.documentDirectory}static/frames/`;
  const outputFramePattern = `${frameDir}frame%03d.jpg`;

  // Ensure the frame directory exists
  const frameDirExists = await FileSystem.getInfoAsync(frameDir).then(
    info => info.exists,
  );
  if (!frameDirExists) {
    await FileSystem.makeDirectoryAsync(frameDir, {intermediates: true});
  }

  // Construct the FFmpeg command
  const command = `-i "${videoPath}" -vf "fps=1" "${outputFramePattern}"`;

  // Execute the command
  const session = await FFmpegKit.execute(command);
  const returnCode = await session.getReturnCode();

  // Log results
  if (ReturnCode.isSuccess(returnCode)) {
    const framesCount = Math.ceil(duration / 1000); // Dividing by 1000 to get duration in seconds
    const generatedFrames: string[] = [];
    for (let i = 1; i <= framesCount; i++) {
      // You're extracting a frame every 3 seconds, hence the division by 3
      generatedFrames.push(`${frameDir}frame${String(i).padStart(3, '0')}.jpg`);
    }
    return {
      frames: generatedFrames,
      isSuccess: true,
    };
  } else {
    return {
      frames: [],
      isSuccess: false,
    };
  }
};

export {downloadVideo, generateFrames};
