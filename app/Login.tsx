import api from '@/api'
import InputField from '@/components/InputField'
import authSchema, { AuthSchema } from '@/form.config'
import AuthProps from '@/types/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'

const Login = () => {
	const navigation = useNavigation()
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<AuthSchema>({
		resolver: zodResolver(authSchema)
	})

	const onSubmit = async (data: AuthProps) => {
		try {
			const result = await api.loginUser(data)
			console.log(result)
			if (result) {
				navigation.navigate('Home')
			}
		} catch (error) {
			return Alert.alert(
				'Ошибка',
				'Что-то пошло не так. Попробуйте позже.',
				[{ text: 'OK', onPress: () => console.log('OK Pressed') }],
				{ cancelable: true }
			)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 32, fontWeight: 600 }}>Авторизация</Text>
			<View style={styles.form}>
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputField
							label='Введите логин'
							value={value}
							onChangeText={onChange}
							error={errors?.username && errors.username.message}
						/>
					)}
					name='username'
				/>
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<InputField
							label='Введите пароль'
							secureTextEntry={true}
							value={value}
							onChangeText={onChange}
							error={errors?.password && errors.password.message}
						/>
					)}
					name='password'
				/>
				<Button
					title='Создать аккаунт'
					onPress={() => {
						navigation.navigate('Registration')
					}}
				/>
				<Button title='Войти' onPress={handleSubmit(onSubmit)} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 10,
		paddingTop: 60,
		gap: 40
	},
	form: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',

		gap: 10
	},
	button: {
		width: '100%',
		borderRadius: 8
	}
})

export default Login
