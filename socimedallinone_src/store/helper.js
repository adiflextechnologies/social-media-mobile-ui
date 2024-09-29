import { Dimensions, Image } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const getImageSize = (uri) => {
	const success = (resolve) => (width, height) => {
		if (screenHeight < screenWidth) {
			screenWidth = screenHeight;
		}

		resolve({
			width: screenWidth * 0.9,
			height: screenWidth * 0.9
		});
	};

	const error = (reject) => (failure) => {
		reject(failure);
	};

	return new Promise((resolve, reject) => {
		Image.getSize(uri, success(resolve), error(reject));
	});
};

export { getImageSize };
