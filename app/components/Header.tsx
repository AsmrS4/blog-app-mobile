import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = () => {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.textStyle}>HIT's Блог</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		height: 60,
		padding: 10,
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		boxShadow: '0px 2px 11px -1px rgba(34, 60, 80, 0.2)'
	},
	textStyle: {
		fontSize: 18,
		fontWeight: 700,
		color: '#3490dc'
	}
})

export default Header
