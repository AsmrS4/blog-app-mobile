import api from '@/api'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const Header = () => {
	const navigation = useNavigation()
	const [username, setUserName] = useState<string | null>(null)
	useEffect(() => {
		if (localStorage.getItem('USERNAME')) {
			setUserName(localStorage.getItem('USERNAME'))
		} else {
			setUserName(null)
		}
	}, [])
	const handleLogout = async () => {
		await api.logoutUser()
		localStorage.clear()
		navigation.navigate('Login')
	}
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.textStyle}>HIT's Блог</Text>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					gap: 10
				}}
			>
				<Text>{username}</Text>
				{username ? (
					<Button title='Выйти' onPress={handleLogout} />
				) : (
					<Button
						title='Войти'
						onPress={() => {
							navigation.navigate('Login')
						}}
					/>
				)}
			</View>
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
