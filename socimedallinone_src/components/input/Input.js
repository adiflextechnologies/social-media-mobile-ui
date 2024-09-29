import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import React, { forwardRef } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { colors } from '../../theme';

const Input = ({
	icon,
	placeholder = '',
	onChangeText = null,
	value = '',
	onIconPress,
	containerStyle,
	keyboardType
}) => {
	return (
		<View style={[styles.container, containerStyle]}>
			{icon ? (
				<TouchableOpacity
					style={styles.iconContainer}
					onPress={onIconPress}
				>
					<FontAwesome5 name={icon} size={20} color={colors.white} />
				</TouchableOpacity>
			) : null}
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				onChangeText={onChangeText}
				keyboardType={keyboardType}
				value={value}
				placeholderTextColor={'#A9A9A9'}
			/>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.accent,
		height: 50,
		borderRadius: 5,
		alignItems: 'center',
		flexDirection: 'row'
	},
	input: {
		paddingStart: 20,
		fontSize: 18,
		color: colors.white,
		flex: 1
	},
	iconContainer: {
		paddingHorizontal: 15,
		borderEndWidth: 1,
		borderEndColor: '#D3D3D3'
	}
});
