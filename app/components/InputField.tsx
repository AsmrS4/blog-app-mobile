import React from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'

interface InputProps {
	label?: string
	value: string | undefined
	onChangeText: (text: string) => void
	secureTextEntry?: boolean
	error?: string
}

const InputField = ({
	label,
	value,
	onChangeText,
	error,
	secureTextEntry = false
}: InputProps) => {
	return (
		<>
			<TextInput
				style={[styles.input]}
				placeholder={label}
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={secureTextEntry}
			/>
			{error ? <Text style={styles.error}>{error}</Text> : null}
		</>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		paddingHorizontal: 8,
		marginBottom: 10,
		borderRadius: 8,
		width: '80%'
	},
	error: {
		color: 'red',
		fontSize: 12,
		marginTop: 5
	}
})

export default InputField
