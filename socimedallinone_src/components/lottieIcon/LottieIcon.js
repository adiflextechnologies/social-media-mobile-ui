import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { lotties } from '../../assets';
import Lottie from 'lottie-react-native';

const LottieIcon = ({ size, name, autoPlay = true, loop = true }) => {
	return (
		<Lottie
			style={{
				width: size,
				height: size
			}}
			autoPlay={autoPlay}
			loop={loop}
			source={lotties[name]}
		/>
	);
};

export default LottieIcon;

const styles = StyleSheet.create({});
